/**
 * Simple debounce function.
 * 
 * @param func 
 * @param delay 
 * @returns 
 * 
 * @usage
 * ```ts
 * const debounceSetStyles = useMemo(() =>
 *    debounce((key: keyof LabelData['styles'], value: any) => {
 *    setStyles(prev => ({ ...prev, [key]: value }));
 * }), []);
 * ```
 */
export function debounce<T extends (...args: any[]) => any>
  (func: T, delay: number = 75):
  (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Returns a total count of words from a given text input.
 *
 * @param text - The generated text content (with HTML tags)
 * @returns The total number of words from the text
 */
export function countWords(text: string) {
  const words = text
    .replace(/<[^>]+(>|$)/g, '')        // remove any HTML tags
    .trim()                             // remove leading/trailing whitespaces
    .split(/\s+/)                       // split the text by spaces
    .filter(word => word.length > 0);   // filter out any empty strings

  return words.length;
}

/**
 * Estimates the number of syllables in a given word.
 * 
 * - Handles special cases like words starting with 'some'.
 * - Ignores silent 'e' endings and leading 'y' characters.
 * - Groups consecutive vowels (1–2) as a single syllable.
 * 
 * @param word - The word to count syllables in.
 * @returns Estimated number of syllables (minimum 1).
 */
export function countSyllables(word: string) {
  word = word.toLowerCase();

  let someCount = 0;
  if (word.length > 3 && word.substring(0, 4) === 'some') {
    word = word.replace('some', '');
    someCount++;
  }

  word = word
    .replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '')  // remove trailing "e", "es", and (silent) "ed" endings
    .replace(/^y/, '');                             // remove leading "y"

  const syllable = word.match(/[aeiouy]{1,2}/g);

  return syllable ? syllable.length + someCount : 1;
}

/**
 * Analyzes a block of text and extracts key readability metrics.
 * 
 * - Strips HTML tags, whitespace, and common HTML entities.
 * - Counts sentences, words, syllables, and letters.
 * - Categorizes words by syllable count (tiny, small, big).
 * - Identifies simple words often ignored in readability formulas.
 * 
 * @param content - The input text or HTML content to analyze.
 * @returns An object containing counts for sentences, words, syllables, letters, characters, and categorized word types.
 */
export function countContent(content: string) {
  const text = content
    .replace(/<[^>]+(>|$)/g, '')// remove HTML tags
    .replace(/^[ \t]+/gm, '')   // remove leading spaces
    .replace(/\n+/g, ' ')       // replace double+ newlines with spaces
    .replace(/(\t)/g, ' ')      // replace tabs with spaces
    .replace(/&#39;/g, '\'')    // replace HTML apostrophes
    .replace(/&quot;/g, '"')    // replace HTML double quotes
    .trim();

  const sentences = text
    .split(/[.!?]+/) // split by punctuation
    .filter(sentence => sentence.trim().length > 0)
    .length;

  const allWords = text.trim().split(/\s+/); // split the text by spaces

  const words = allWords
    .filter(word => word.length > 0) // filter out any empty strings
    .length;

  let bigWords = 0;           // words with 3+ syllables, i.e. polysyllables
  let smallWords = 0;         // words with 1-2 syllables
  let tinyWords = 0;          // 1-syllable words
  let linsearIgnores = 0;     // ignored words used in Linsear Write formula
  const syllables = allWords
    .map(word => {
      const syllableCount = countSyllables(word);

      if (syllableCount >= 3) {
        bigWords++;
      } else if (syllableCount <= 2) {
        smallWords++;
        if (syllableCount === 1) { tinyWords++; }
        if (['the', 'is', 'are', 'was', 'were'].includes(word)) { linsearIgnores++; }
      }
      return syllableCount;
    })
    .reduce((sum, syllables) => sum + syllables, 0);

  const letters = (text.match(/[a-z]/gi) || []).length;
  const characters = (text.match(/[a-z0-9]/gi) || []).length;

  return { sentences, words, bigWords, smallWords, tinyWords, linsearIgnores, syllables, letters, characters };
}

/**
 * Calculates a variety of readability scores for a block of text.
 * 
 * This function analyzes the text using standard readability formulas, including:
 * - **Flesch-Kincaid Grade Level** (school grade level estimate)
 * - **Flesch Reading Ease** (easier = higher score)
 * - **Gunning Fog Index** (complexity based on sentence length and big words)
 * - **Automated Readability Index** (technical writing readability)
 * - **Linsear Write Formula** (technical/business writing)
 * - **Coleman-Liau Index** (based on characters instead of syllables)
 * - **SMOG Index** (healthcare and education materials)
 * - **Fry Readability Formula** (simplified grade level estimate)
 * 
 * It considers:
 * - Average sentence length
 * - Average syllables per word
 * - Percentage of complex (3+ syllable) words
 * - Character and letter densities per word
 * 
 * Returns all major scores individually, along with an overall average readability estimate.
 * 
 * @param content - The text or HTML content to assess.
 * @returns An object containing all individual readability scores and the averaged score.
 */
export function scoreReadability(content: string) {
  const { sentences, words, bigWords, smallWords, tinyWords, linsearIgnores, syllables, letters, characters } = countContent(content);

  const avgChars = characters / words;
  const avgSentenceLength = words / sentences;        // average sentence length
  const avgSyllablesPerWord = syllables / words;      // average syllables per word
  const complexPercent = 100 * (bigWords / words);    // percentage of big words
  const lettersPer100Words = 100 * (letters / words);
  const sentencesPer100Words = 100 * (sentences / words);

  const fleschKincaidGrade = Number.parseFloat((0.39 * avgSentenceLength + (11.8 * avgSyllablesPerWord) - 15.59).toFixed(2)); // general, all-purpose
  const fleschReadEase = Number.parseFloat((206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord)).toFixed()); // general, all-purpose
  const gunningFog = Number.parseFloat((0.4 * (avgSentenceLength + complexPercent)).toFixed(1)); // business literature
  const automatedRead = Number.parseFloat(((4.71 * avgChars) + (0.5 * avgSentenceLength) - 21.43).toFixed(2)); // technical writing
  let linsearWrite = Number.parseFloat((((smallWords - linsearIgnores) + (3 * bigWords)) / sentences).toFixed(2)); // technical writing
  linsearWrite = linsearWrite > 20 ? linsearWrite /= 2 : (linsearWrite / 2) - 1;
  const forecastRead = Number.parseFloat((20 - ((tinyWords * 150) / (words * 10))).toFixed(2)); // technical manuals
  const colemanLiau = Number.parseFloat((0.0588 * lettersPer100Words - 0.296 * sentencesPer100Words - 15.8).toFixed(2)); // education
  const smogIndex = Number.parseFloat((1.043 * Math.sqrt(bigWords * (30 / sentences) + 3.1291)).toFixed(2)); // healthcare
  const fryRead = Number.parseFloat((20 - ((tinyWords * 150) / (words * 10))).toFixed(2)); // healthcare

  // all scores excluding fleschReadEase
  const scores = [fleschKincaidGrade, gunningFog, automatedRead, linsearWrite, forecastRead, colemanLiau, smogIndex, fryRead];
  const averageScore = Number((scores.reduce((acc, val) => acc + val, 0) / scores.length).toFixed());

  return { fleschKincaidGrade, fleschReadEase, gunningFog, automatedRead, linsearWrite, forecastRead, colemanLiau, smogIndex, fryRead, averageScore };
}