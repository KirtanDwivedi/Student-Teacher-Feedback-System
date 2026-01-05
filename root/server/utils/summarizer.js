/**
 * Simple text summarizer utility
 * Replaces the previous Python-based AI service
 */

/**
 * Summarizes a list of text inputs into bullet points
 * @param {string[]} texts - Array of text strings to summarize
 * @returns {string} - Formatted summary string
 */
const summarizeText = (texts) => {
    if (!texts || !Array.isArray(texts) || texts.length === 0) {
        return '';
    }

    // Join all texts into one large block
    const combinedText = texts.join(' ');

    // Split by sentences (naive implementation using periods)
    // Filter out empty strings
    const sentences = combinedText
        .split('.')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    // Format as bullet points
    const summary = sentences
        .map(s => `- ${s}`)
        .join('\n');

    return summary;
};

module.exports = { summarizeText };
