import type { Meta, StoryObj } from '@storybook/react-vite'
import WidgetsDropdown from './WidgetsDropdown'

const meta = {
  title: 'Widgets/WidgetsDropdown',
  component: WidgetsDropdown,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof WidgetsDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
