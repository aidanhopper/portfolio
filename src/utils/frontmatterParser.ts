import * as yaml from 'js-yaml';

export interface ParsedMarkdown<T = Record<string, unknown>> {
  data: T;
  content: string;
}

export function parseFrontmatter<T = Record<string, unknown>>(rawText: string): ParsedMarkdown<T> {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = rawText.match(frontmatterRegex);

  if (!match) {
    return {
      data: {} as T,
      content: rawText,
    };
  }

  const yamlText = match[1];
  const markdownContent = match[2];

  try {
    const data = (yaml.load(yamlText) as T) || ({} as T);
    return {
      data,
      content: markdownContent,
    };
  } catch (error) {
    console.error('Failed to parse YAML frontmatter:', error);
    return {
      data: {} as T,
      content: markdownContent,
    };
  }
}
