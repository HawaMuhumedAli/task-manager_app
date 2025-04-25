export function getInitials(name = "") {
    if (!name) return "U";
    const words = name.split(" ");
    if (words.length === 1) return words[0][0]?.toUpperCase() || "U";
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  