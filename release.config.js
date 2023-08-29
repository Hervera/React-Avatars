module.exports = {
    plugins: [
      ["@semantic-release/commit-analyzer", { preset: "conventionalcommits" }],
      "@semantic-release/release-notes-generator",
      ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
      ["@semantic-release/npm", { npmPublish: false }],
      "@semantic-release/git"
    ],
    // Use the version from package.json for tagging
    // Semantic Release will still calculate the version bump based on commits
    prepare: [
      "@semantic-release/changelog",
      "@semantic-release/npm",
      {
        path: "@semantic-release/exec",
        cmd: "echo ${nextRelease.version} > version.txt"
      },
      {
        path: "@semantic-release/git",
        assets: ["CHANGELOG.md", "version.txt", "package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
        tagFormat: "${version}"
      }
    ]
  };
  