import React from 'react';
import { render } from '@testing-library/react-native';
import { CourtCard } from '../components/player/CourtCard';
import { MOCK_COURTS } from '../data/mockData';

describe('CourtCard', () => {
  it('renders court name and price', () => {
    const { getByText } = render(
      <CourtCard court={MOCK_COURTS[0]} onPress={() => {}} />
    );
    expect(getByText('Kicks Arena')).toBeTruthy();
    expect(getByText('Rs. 1,200/hr')).toBeTruthy();
  });

  it('renders location', () => {
    const { getByText } = render(
      <CourtCard court={MOCK_COURTS[0]} onPress={() => {}} />
    );
    expect(getByText('Thamel, Kathmandu')).toBeTruthy();
  });

  it('shows unavailable badge when court is not available', () => {
    const { getByText } = render(
      <CourtCard court={MOCK_COURTS[3]} onPress={() => {}} />
    );
    expect(getByText('Unavailable')).toBeTruthy();
  });
});
