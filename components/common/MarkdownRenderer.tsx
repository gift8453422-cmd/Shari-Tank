import React from 'react';

interface MarkdownRendererProps {
  text: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text }) => {
  if (!text) return null;

  // Simple markdown processing for bold and list items
  const processLine = (line: string) => line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  const elements = [];
  let currentList: React.ReactElement[] = [];

  text.split('\n').forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      currentList.push(
        <li key={`${index}-li`} dangerouslySetInnerHTML={{ __html: processLine(trimmedLine.substring(2)) }} />
      );
    } else {
      if (currentList.length > 0) {
        elements.push(<ul key={`${index}-ul`}>{currentList}</ul>);
        currentList = [];
      }
      if (trimmedLine) {
        elements.push(<p key={index} dangerouslySetInnerHTML={{ __html: processLine(trimmedLine) }} />);
      }
    }
  });

  if (currentList.length > 0) {
    elements.push(<ul key="last-ul">{currentList}</ul>);
  }

  return <div className="analysis-content">{elements}</div>;
};
