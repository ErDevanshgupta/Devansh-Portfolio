const slugifyLib = require('slugify');

const createSlug = (text) => {
  return slugifyLib(text, {
    lower: true,
    strict: true,   // Remove special characters
    trim: true
  });
};

module.exports = { createSlug };
