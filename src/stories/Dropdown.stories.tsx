import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown, DropdownOption } from '../components/Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    controlled: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions: DropdownOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
];

const countryOptions: DropdownOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
];

const optionsWithData: DropdownOption<{ color: string; emoji: string }>[] = [
  { value: 'apple', label: 'Apple', data: { color: 'red', emoji: '🍎' } },
  { value: 'banana', label: 'Banana', data: { color: 'yellow', emoji: '🍌' } },
  { value: 'orange', label: 'Orange', data: { color: 'orange', emoji: '🍊' } },
  { value: 'grape', label: 'Grape', data: { color: 'purple', emoji: '🍇' } },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Favorite Fruit',
    options: basicOptions,
    placeholder: 'Choose your favorite',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Pre-selected Option',
    options: basicOptions,
    defaultValue: 'banana',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    error: 'Please select your country',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    options: basicOptions,
    disabled: true,
    defaultValue: 'apple',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Some Options Disabled',
    options: [
      { value: 'active1', label: 'Active Option 1' },
      { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
      { value: 'active2', label: 'Active Option 2' },
      { value: 'disabled2', label: 'Disabled Option 2', disabled: true },
      { value: 'active3', label: 'Active Option 3' },
    ],
  },
};

export const ControlledMode: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Dropdown
          label="Controlled Dropdown"
          options={basicOptions}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          controlled
        />
        <p>Selected value: {value || 'none'}</p>
      </div>
    );
  },
};

export const CustomRenderOption: Story = {
  args: {
    label: 'Custom Rendered Options',
    options: optionsWithData,
    renderOption: ({ option, isSelected }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{option.data?.emoji}</span>
        <span>{option.label}</span>
        {isSelected && <span style={{ marginLeft: 'auto' }}>✓</span>}
      </div>
    ),
  },
};

export const ComplexRenderOption: Story = {
  args: {
    label: 'Complex Custom Render',
    options: optionsWithData,
    renderOption: ({ option, isSelected, isFocused }) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px',
          backgroundColor: isFocused ? '#f0f0f0' : 'transparent',
          borderRadius: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>{option.data?.emoji}</span>
          <div>
            <div style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
              {option.label}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Color: {option.data?.color}
            </div>
          </div>
        </div>
        {isSelected && (
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: option.data?.color,
            }}
          />
        )}
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Dropdown',
    options: countryOptions,
    fullWidth: true,
    placeholder: 'Select your country',
  },
};

export const LongList: Story = {
  args: {
    label: 'Many Options',
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
    })),
    placeholder: 'Select from many options',
  },
};