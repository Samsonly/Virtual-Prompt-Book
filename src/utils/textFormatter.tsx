import React from "react";

// Define the mapping from HTML tags to their corresponding React components
export const formatContent = (content: string): React.ReactNode[] => {
  const tagMap: { [key: string]: React.ElementType } = {
    em: "em",
    i: "i",
    b: "b",
    u: "u",
  };

  // Create a regular expression to match the HTML tags
  const regex = new RegExp(
    Object.keys(tagMap)
      .map((tag) => `</?${tag}>`)
      .join("|"),
    "gi"
  );

  // Split the content into parts using the regular expression
  const parts = content.split(regex);
  const tags = content.match(regex) || [];
  const stack: React.ElementType[] = [];

  // Use reduce to accumulate the formatted parts
  return parts.reduce<React.ReactNode[]>((acc, part, index) => {
    if (index === 0) {
      // The first part does not have a preceding tag
      return [<React.Fragment key={index}>{part}</React.Fragment>];
    }

    const tag = tags[index - 1];
    if (tag) {
      const tagName = tag.replace(/[<>/]/g, "").toLowerCase();

      if (tag.startsWith("</")) {
        // Handle closing tags by popping the stack
        stack.pop();
      } else {
        // Handle opening tags by pushing them onto the stack
        stack.push(tagMap[tagName]);
      }

      const CurrentComponent =
        stack.length > 0 ? stack[stack.length - 1] : React.Fragment;

      // Add the current part with the corresponding tag applied
      acc.push(<CurrentComponent key={index}>{part}</CurrentComponent>);
    } else {
      // If there's no tag, simply add the part as a fragment
      acc.push(<React.Fragment key={index}>{part}</React.Fragment>);
    }

    return acc;
  }, []);
};
