# UI Components

This directory contains reusable UI components built with TailwindCSS.

## Card Component

The Card component system provides consistent styling for card titles, descriptions, and bar elements throughout the application.

### Usage

```tsx
import { Card, CardContent, CardTitle, CardDescription, CardBar } from "@/components/ui/card";

export const ExampleCard = () => {
  return (
    <Card variant="default" size="md">
      <CardContent>
        <CardBar colorScheme="primary" size="sm" className="mb-3" />
        <CardTitle colorScheme="default" size="md">Example Title</CardTitle>
        <CardDescription colorScheme="muted">
          Example description text
        </CardDescription>
      </CardContent>
    </Card>
  );
};
```

### Card Variants

The `Card` component supports the following variants:

- `default`: White background with border (dark mode: dark gray background)
- `outline`: Transparent background with border
- `filled`: Light gray background (dark mode: dark gray) without border
- `ghost`: Transparent background without border or shadow

### Size Variants

All components support consistent size variants:

- `sm`: Small
- `md`: Medium (default)
- `lg`: Large

### Color Schemes

Components support consistent color schemes:

#### CardTitle
- `default`: Dark gray text (white in dark mode)
- `muted`: Medium gray text
- `primary`: Primary brand color

#### CardDescription
- `default`: Medium gray text
- `muted`: Lighter gray text
- `primary`: Primary brand color, slightly muted

#### CardBar
- `default`: Light gray bar (dark gray in dark mode)
- `primary`: Blue brand color
- `secondary`: Medium gray
- `accent`: Indigo/purple
- `success`: Green
- `warning`: Yellow
- `danger`: Red

### Components

- `Card`: The container component
- `CardHeader`: Header section (usually contains title)
- `CardTitle`: Title text with standardized styling
- `CardDescription`: Description text with standardized styling
- `CardContent`: Main content area
- `CardFooter`: Footer area (usually contains buttons)
- `CardBar`: Decorative bar/divider element

### Customization

All components accept className for additional customization:

```tsx
<CardTitle 
  colorScheme="primary"
  size="lg"
  className="my-custom-class"
>
  Custom Title
</CardTitle>
``` 