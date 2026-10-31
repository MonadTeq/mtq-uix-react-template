import type { Meta, StoryObj } from '@storybook/react-vite'
import PageSpinner from './PageSpinner'

const meta = {
  title: 'Shared UI/PageSpinner',
  component: PageSpinner,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PageSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
