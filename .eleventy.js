const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItAttrs = require("markdown-it-attrs");
const { execSync } = require("child_process");

module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

  // Render *word* in titles as accented italic span
  eleventyConfig.addFilter("accentTitle", (title) => {
    if (!title) return title;
    return title.replace(/\*([^*]+)\*/g, '<em class="title-accent">$1</em>');
  });

  // Get last git commit date for a file
  eleventyConfig.addFilter("gitLastModified", (filePath) => {
    try {
      const date = execSync(
        `git log -1 --format="%ci" -- "${filePath}"`,
        { encoding: "utf8" }
      ).trim();
      if (!date) return null;
      return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric"
      });
    } catch (e) {
      return null;
    }
  });
  // Markdown
  const md = markdownIt({ html: true, typographer: true })
    .use(markdownItFootnote)
    .use(markdownItAttrs);
  eleventyConfig.setLibrary("md", md);

  // Passthrough
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("assets");

  // Date filters
  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric"
    });
  });

  eleventyConfig.addFilter("dateISO", (date) => {
    return new Date(date).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("dateYear", (date) => {
    return new Date(date).getFullYear();
  });

  eleventyConfig.addFilter("dateDay", (date) => {
    return new Date(date).getDate();
  });

  eleventyConfig.addFilter("dateMonth", (date) => {
    return new Date(date).toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  });

  eleventyConfig.addFilter("dateMonthDay", (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric", month: "long"
    });
  });

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addFilter("stripDate", (slug) => {
    return slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  });

  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md")
      .filter(p => p.data.publish !== false)
      .reverse();
  });

  eleventyConfig.addCollection("postsByYear", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("./posts/*.md")
      .filter(p => p.data.publish !== false)
      .reverse();
    const byYear = {};
    posts.forEach(post => {
      const year = new Date(post.date).getFullYear();
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(post);
    });
    return Object.keys(byYear)
      .sort((a, b) => b - a)
      .map(year => ({ year, posts: byYear[year] }));
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};