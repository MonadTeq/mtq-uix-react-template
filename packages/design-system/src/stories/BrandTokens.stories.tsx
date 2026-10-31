import type { Meta, StoryObj } from '@storybook/react-vite'
import { brandColorTokens } from '@mtq/design-system'

const meta = {
  title: 'Design System/Brand Tokens',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Swatches = () => (
  <div style={{ display: 'grid', gap: '1rem', maxWidth: 480 }}>
    {Object.entries(brandColorTokens).map(([name, token]) => (
      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: 48,
            height: 48,
            background: token,
            borderRadius: 8,
            border: '1px solid var(--cui-border-color)',
          }}
        />
        <code style={{ flex: 1 }}>{token}</code>
        <code>{name}</code>
      </div>
    ))}
  </div>
)

export const BrandColors: Story = {
  render: () => <Swatches />,
}
