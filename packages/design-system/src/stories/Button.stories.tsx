import type { Meta, StoryObj } from '@storybook/react-vite'
import { CButton } from '@mtq/design-system'

const meta = {
  title: 'Design System/Button',
  component: CButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    },
  },
  args: {
    color: 'primary',
    children: 'Button',
  },
} satisfies Meta<typeof CButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { color: 'primary' },
}

export const Secondary: Story = {
  args: { color: 'secondary' },
}

export const Success: Story = {
  args: { color: 'success' },
}

export const Danger: Story = {
  args: { color: 'danger' },
}

export const Outline: Story = {
  args: { color: 'primary', variant: 'outline' },
}

export const Ghost: Story = {
  args: { color: 'primary', variant: 'ghost' },
}

export const Disabled: Story = {
  args: { color: 'primary', disabled: true },
}
