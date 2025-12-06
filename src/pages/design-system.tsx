import {
  BellIcon,
  Cog6ToothIcon,
  FilmIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  PlusIcon,
  SparklesIcon,
  StarIcon,
  TvIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import {
  GlassAlert,
  GlassAvatar,
  GlassAvatarGroup,
  GlassBadge,
  GlassButton,
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
  GlassConfirmModal,
  GlassDropdownButton,
  GlassHeroSlider,
  GlassInlineAlert,
  GlassInput,
  GlassModal,
  GlassPageLoading,
  GlassPoster,
  GlassPosterGrid,
  GlassPosterSkeleton,
  GlassProgress,
  GlassPulseDot,
  GlassSelect,
  GlassSkeleton,
  GlassSlider,
  GlassSliderItem,
  GlassSpinner,
  GlassStatusBadge,
  GlassTabPanel,
  GlassTabs,
  GlassTextarea,
  GlassToast,
  GlassTooltip,
} from '@app/components/GlassUI';

const DesignSystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buttons');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Sample data for posters
  const samplePosters = [
    { title: 'Inception', year: 2010, rating: 8.8 },
    { title: 'The Matrix', year: 1999, rating: 8.7 },
    { title: 'Interstellar', year: 2014, rating: 8.6 },
    { title: 'Dune', year: 2021, rating: 8.0 },
    { title: 'Blade Runner 2049', year: 2017, rating: 8.0 },
    { title: 'Arrival', year: 2016, rating: 7.9 },
  ];

  const tabs = [
    { id: 'buttons', label: 'Buttons', icon: <SparklesIcon className="h-4 w-4" /> },
    { id: 'inputs', label: 'Inputs', icon: <Cog6ToothIcon className="h-4 w-4" /> },
    { id: 'cards', label: 'Cards', icon: <FilmIcon className="h-4 w-4" /> },
    { id: 'badges', label: 'Badges', icon: <StarIcon className="h-4 w-4" /> },
    { id: 'feedback', label: 'Feedback', icon: <BellIcon className="h-4 w-4" /> },
    { id: 'media', label: 'Media', icon: <TvIcon className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-glass-black">
      {/* Header */}
      <header className="glass-nav">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-seerr text-2xl font-bold">Glass Design System</h1>
            <div className="flex items-center gap-4">
              <GlassButton variant="ghost" size="icon">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </GlassButton>
              <GlassAvatar name="John Doe" size="sm" status="online" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h2 className="text-display-xl text-text-primary mb-4">
            Premium Glassmorphism UI
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Apple TV-inspired design system with frosted glass effects, smooth
            animations, and a premium aesthetic.
          </p>
        </section>

        {/* Color Palette */}
        <section className="mb-12">
          <h3 className="text-display-sm mb-6">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="h-16 w-full rounded-glass-sm bg-apple-blue mb-2" />
              <p className="text-sm font-medium">Apple Blue</p>
              <p className="text-xs text-text-tertiary">#0A84FF</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="h-16 w-full rounded-glass-sm bg-status-success mb-2" />
              <p className="text-sm font-medium">Success</p>
              <p className="text-xs text-text-tertiary">#30D158</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="h-16 w-full rounded-glass-sm bg-status-warning mb-2" />
              <p className="text-sm font-medium">Warning</p>
              <p className="text-xs text-text-tertiary">#FFD60A</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="h-16 w-full rounded-glass-sm bg-status-error mb-2" />
              <p className="text-sm font-medium">Error</p>
              <p className="text-xs text-text-tertiary">#FF453A</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="h-16 w-full rounded-glass-sm bg-status-info mb-2" />
              <p className="text-sm font-medium">Info</p>
              <p className="text-xs text-text-tertiary">#64D2FF</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="h-16 w-full rounded-glass-sm bg-glass-400 border border-glass-border mb-2" />
              <p className="text-sm font-medium">Glass Surface</p>
              <p className="text-xs text-text-tertiary">rgba(255,255,255,0.12)</p>
            </div>
          </div>
        </section>

        {/* Component Tabs */}
        <section className="mb-12">
          <GlassTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="default"
          />

          {/* Buttons Tab */}
          <GlassTabPanel id="buttons" activeTab={activeTab}>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Button Variants</h4>
                <div className="flex flex-wrap gap-4">
                  <GlassButton variant="default">Default</GlassButton>
                  <GlassButton variant="primary">Primary</GlassButton>
                  <GlassButton variant="success">Success</GlassButton>
                  <GlassButton variant="danger">Danger</GlassButton>
                  <GlassButton variant="warning">Warning</GlassButton>
                  <GlassButton variant="ghost">Ghost</GlassButton>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Button Sizes</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <GlassButton size="sm">Small</GlassButton>
                  <GlassButton size="md">Medium</GlassButton>
                  <GlassButton size="lg">Large</GlassButton>
                  <GlassButton size="icon">
                    <PlusIcon className="h-5 w-5" />
                  </GlassButton>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Button States</h4>
                <div className="flex flex-wrap gap-4">
                  <GlassButton variant="primary" isLoading>
                    Loading
                  </GlassButton>
                  <GlassButton variant="primary" disabled>
                    Disabled
                  </GlassButton>
                  <GlassButton
                    variant="primary"
                    leftIcon={<PlayIcon className="h-4 w-4" />}
                  >
                    With Icon
                  </GlassButton>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Dropdown Button</h4>
                <GlassDropdownButton
                  label="Actions"
                  variant="primary"
                  items={[
                    { id: '1', label: 'Edit', icon: <Cog6ToothIcon className="h-4 w-4" /> },
                    { id: '2', label: 'Duplicate', icon: <PlusIcon className="h-4 w-4" /> },
                    { id: 'divider', label: '', divider: true },
                    { id: '3', label: 'Delete', danger: true },
                  ]}
                />
              </div>
            </div>
          </GlassTabPanel>

          {/* Inputs Tab */}
          <GlassTabPanel id="inputs" activeTab={activeTab}>
            <div className="max-w-md space-y-6">
              <GlassInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                leftIcon={<UserIcon className="h-5 w-5" />}
              />

              <GlassInput
                label="Search"
                placeholder="Search for movies..."
                leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <GlassInput
                label="Password"
                type="password"
                placeholder="Enter password"
                error="Password must be at least 8 characters"
              />

              <GlassSelect
                label="Quality Profile"
                options={[
                  { value: 'hd', label: 'HD - 1080p' },
                  { value: '4k', label: '4K - 2160p' },
                  { value: 'any', label: 'Any' },
                ]}
                placeholder="Select quality"
              />

              <GlassTextarea
                label="Description"
                placeholder="Write a description..."
                hint="Maximum 500 characters"
              />
            </div>
          </GlassTabPanel>

          {/* Cards Tab */}
          <GlassTabPanel id="cards" activeTab={activeTab}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GlassCard>
                <GlassCardHeader>
                  <GlassCardTitle>Default Card</GlassCardTitle>
                  <GlassCardDescription>
                    Standard glass card with subtle backdrop blur
                  </GlassCardDescription>
                </GlassCardHeader>
                <GlassCardContent>
                  <p className="text-text-secondary">
                    This is the default card style with glassmorphism effects.
                  </p>
                </GlassCardContent>
              </GlassCard>

              <GlassCard variant="hover">
                <GlassCardHeader>
                  <GlassCardTitle>Hover Card</GlassCardTitle>
                  <GlassCardDescription>
                    Card with hover effects
                  </GlassCardDescription>
                </GlassCardHeader>
                <GlassCardContent>
                  <p className="text-text-secondary">
                    Hover over this card to see the scale and glow effect.
                  </p>
                </GlassCardContent>
              </GlassCard>

              <GlassCard variant="prominent">
                <GlassCardHeader>
                  <GlassCardTitle>Prominent Card</GlassCardTitle>
                  <GlassCardDescription>
                    More visible glass effect
                  </GlassCardDescription>
                </GlassCardHeader>
                <GlassCardContent>
                  <p className="text-text-secondary">
                    This card has stronger blur and shadow effects.
                  </p>
                </GlassCardContent>
                <GlassCardFooter>
                  <GlassButton variant="ghost" size="sm">
                    Cancel
                  </GlassButton>
                  <GlassButton variant="primary" size="sm">
                    Save
                  </GlassButton>
                </GlassCardFooter>
              </GlassCard>
            </div>
          </GlassTabPanel>

          {/* Badges Tab */}
          <GlassTabPanel id="badges" activeTab={activeTab}>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Badge Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <GlassBadge>Default</GlassBadge>
                  <GlassBadge variant="primary">Primary</GlassBadge>
                  <GlassBadge variant="success">Success</GlassBadge>
                  <GlassBadge variant="warning">Warning</GlassBadge>
                  <GlassBadge variant="error">Error</GlassBadge>
                  <GlassBadge variant="info">Info</GlassBadge>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Status Badges</h4>
                <div className="flex flex-wrap gap-3">
                  <GlassStatusBadge status="online" />
                  <GlassStatusBadge status="offline" />
                  <GlassStatusBadge status="pending" label="Processing" />
                  <GlassStatusBadge status="error" label="Failed" />
                  <GlassStatusBadge status="success" label="Available" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Avatars</h4>
                <div className="flex flex-wrap items-end gap-4">
                  <GlassAvatar name="John Doe" size="xs" />
                  <GlassAvatar name="Jane Smith" size="sm" status="online" />
                  <GlassAvatar name="Bob Wilson" size="md" status="busy" />
                  <GlassAvatar name="Alice Brown" size="lg" status="away" />
                  <GlassAvatar name="Charlie Davis" size="xl" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Avatar Group</h4>
                <GlassAvatarGroup
                  avatars={[
                    { name: 'John Doe' },
                    { name: 'Jane Smith' },
                    { name: 'Bob Wilson' },
                    { name: 'Alice Brown' },
                    { name: 'Charlie Davis' },
                    { name: 'Eve Johnson' },
                  ]}
                  max={4}
                />
              </div>
            </div>
          </GlassTabPanel>

          {/* Feedback Tab */}
          <GlassTabPanel id="feedback" activeTab={activeTab}>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Alerts</h4>
                <div className="space-y-4">
                  <GlassAlert variant="info" title="Information">
                    This is an informational message about something important.
                  </GlassAlert>
                  <GlassAlert variant="success" title="Success">
                    Your request has been processed successfully.
                  </GlassAlert>
                  <GlassAlert variant="warning" title="Warning" onClose={() => {}}>
                    Please review your settings before continuing.
                  </GlassAlert>
                  <GlassAlert
                    variant="error"
                    title="Error"
                    action={{ label: 'Retry', onClick: () => {} }}
                  >
                    Something went wrong. Please try again.
                  </GlassAlert>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Loading States</h4>
                <div className="flex items-center gap-6">
                  <GlassSpinner size="sm" />
                  <GlassSpinner size="md" />
                  <GlassSpinner size="lg" />
                  <GlassPulseDot color="blue" />
                  <GlassPulseDot color="green" />
                  <GlassPulseDot color="red" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Progress Bars</h4>
                <div className="space-y-4 max-w-md">
                  <GlassProgress value={25} showLabel />
                  <GlassProgress value={50} variant="success" />
                  <GlassProgress value={75} variant="warning" size="lg" />
                  <GlassProgress value={90} variant="error" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Skeletons</h4>
                <div className="flex gap-4">
                  <GlassSkeleton variant="circular" width={48} height={48} />
                  <div className="flex-1 space-y-2">
                    <GlassSkeleton variant="text" />
                    <GlassSkeleton variant="text" width="60%" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Modals</h4>
                <div className="flex gap-4">
                  <GlassButton variant="primary" onClick={() => setModalOpen(true)}>
                    Open Modal
                  </GlassButton>
                  <GlassButton variant="danger" onClick={() => setConfirmOpen(true)}>
                    Confirm Dialog
                  </GlassButton>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Tooltips</h4>
                <div className="flex gap-4">
                  <GlassTooltip content="This is a tooltip" placement="top">
                    <GlassButton variant="ghost">Hover me (top)</GlassButton>
                  </GlassTooltip>
                  <GlassTooltip content="Bottom tooltip" placement="bottom">
                    <GlassButton variant="ghost">Hover me (bottom)</GlassButton>
                  </GlassTooltip>
                </div>
              </div>
            </div>
          </GlassTabPanel>

          {/* Media Tab */}
          <GlassTabPanel id="media" activeTab={activeTab}>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Poster Grid</h4>
                <GlassPosterGrid>
                  {samplePosters.map((movie, i) => (
                    <GlassPoster
                      key={i}
                      alt={movie.title}
                      title={movie.title}
                      year={movie.year}
                      rating={movie.rating}
                      showPlayButton
                      href="#"
                    />
                  ))}
                </GlassPosterGrid>
              </div>

              <div>
                <GlassSlider title="Trending Now" href="#">
                  {samplePosters.concat(samplePosters).map((movie, i) => (
                    <GlassSliderItem key={i} width="poster">
                      <GlassPoster
                        alt={movie.title}
                        title={movie.title}
                        year={movie.year}
                        rating={movie.rating}
                      />
                    </GlassSliderItem>
                  ))}
                </GlassSlider>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Poster Skeletons</h4>
                <div className="flex gap-4">
                  <GlassPosterSkeleton size="sm" />
                  <GlassPosterSkeleton size="md" />
                  <GlassPosterSkeleton size="lg" />
                </div>
              </div>
            </div>
          </GlassTabPanel>
        </section>
      </main>

      {/* Modals */}
      <GlassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal Title"
        description="This is a description of what this modal does."
        footer={
          <>
            <GlassButton variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" onClick={() => setModalOpen(false)}>
              Confirm
            </GlassButton>
          </>
        }
      >
        <p>
          This is the modal content. You can put any content here including forms,
          images, or other components.
        </p>
      </GlassModal>

      <GlassConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        title="Delete Item?"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
};

export default DesignSystemPage;
