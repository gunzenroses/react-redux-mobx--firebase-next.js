import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { InfoBlock } from './InfoBlock';

describe('test existing InfoBlock', () => {
  beforeEach(() => {
    render(<InfoBlock title="Отмена" text="test" />);
  });

  test('InfoBlock exists', () => {
    const infoBlock = screen.getByTestId('InfoBlock-wrapper');
    expect(infoBlock).toBeInTheDocument();
    const infoBlockTitle = screen.getByText(/отмена/i);
    expect(infoBlockTitle).toBeInTheDocument();
    const infoBlockText = screen.getByText(/test/i);
    expect(infoBlockText).toBeInTheDocument();
  });
});
