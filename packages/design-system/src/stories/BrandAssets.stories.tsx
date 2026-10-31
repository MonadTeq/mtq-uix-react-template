import type { Meta, StoryObj } from '@storybook/react-vite'
import { CIcon, logo, sygnet } from '@mtq/design-system'

const meta = {
  title: 'Design System/Brand Assets',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Logo: Story = {
  render: () => <CIcon icon={logo} height={48} />,
}

export const Sygnet: Story = {
  render: () => <CIcon icon={sygnet} height={48} />,
}

export const LogoAndSygnet: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <CIcon icon={logo} height={48} />
      <CIcon icon={sygnet} height={48} />
    </div>
  ),
}
