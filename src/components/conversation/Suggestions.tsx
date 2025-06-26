'use client';

import Button from '../base/button';

const suggestions = [
  'What is the meaning of life?',
  'How do you define love?',
  'What is the meaning of AI?',
];

interface SuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ onSuggestionClick }) => {
  return (
    // <div className="flex flex-col flex-wrap gap-2.5 basis-[50%]">
    <div className="shrink-0 grid grid-cols-2 gap-2.5 tablet:grid-cols-3">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          className="min-h-10 px-5 py-3 tablet:px-5.5 tablet:py-5 text-suggestion-size text-suggestion leading-suggestion font-suggestion tablet:text-suggestion-size-tablet tablet:font-suggestion-tablet rounded-md border border-boundary-global-light bg-surface-suggestion hover:bg-surface-suggestion-hover focus-visible:bg-surface-suggestion-hover"
          label={suggestion}
          onClick={() => {
            onSuggestionClick(suggestion);
          }}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};

export default Suggestions;
