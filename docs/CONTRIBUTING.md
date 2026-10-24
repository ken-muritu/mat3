# Contributing to Ma3

Thank you for your interest in contributing to Ma3! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Project Structure](#project-structure)
5. [Coding Standards](#coding-standards)
6. [Git Workflow](#git-workflow)
7. [Pull Request Process](#pull-request-process)
8. [Testing](#testing)
9. [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect all participants to:

- Be respectful and considerate
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or insulting/derogatory comments
- Public or private harassment
- Publishing others' private information without permission

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **pnpm** >= 9.0.0
- **Git**
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - React Native Tools

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mat.git
   cd mat
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ken-muritu/mat3.git
   ```

---

## Development Setup

### Install Dependencies

```bash
pnpm install
```

### Start Development Servers

**Web Application:**
```bash
pnpm dev:web
# Opens at http://localhost:5000
```

**Mobile Application:**
```bash
pnpm dev:mobile
# Opens Expo DevTools
```

### Environment Variables

See the variable table in the [README](../README.md#environment-variables). Keep the values in git-ignored `.env` files.

---

## Project Structure

```
matatu-connect/
├── apps/
│   ├── web/          # React web application
│   └── mobile/       # React Native mobile app
├── packages/
│   └── shared/       # Shared code (types, utils, constants)
├── docs/             # Documentation
└── .github/          # CI/CD workflows
```

### Key Directories

| Directory | Description |
|-----------|-------------|
| `apps/web/src/pages/` | Web page components |
| `apps/web/src/components/` | Reusable web components |
| `apps/mobile/src/screens/` | Mobile screen components |
| `apps/mobile/src/navigation/` | Navigation configuration |
| `packages/shared/src/` | Shared utilities and types |

---

## Coding Standards

### General Guidelines

1. **Write clean, readable code** - Prioritize clarity over cleverness
2. **Follow existing patterns** - Maintain consistency with the codebase
3. **Keep functions small** - Each function should do one thing well
4. **Use meaningful names** - Variables, functions, and components should be self-documenting

### TypeScript

- Use TypeScript for all new code in `packages/shared`
- Define explicit types for function parameters and return values
- Avoid `any` type - use `unknown` if type is truly unknown

```typescript
// Good
function calculateFare(distance: number, baseRate: number): number {
  return distance * baseRate;
}

// Avoid
function calculateFare(distance: any, baseRate: any): any {
  return distance * baseRate;
}
```

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

```jsx
// Good - Focused component
function BookingCard({ booking, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{booking.route}</Text>
      <Text>{booking.fare}</Text>
    </TouchableOpacity>
  );
}

// Avoid - Component doing too much
function BookingCard({ booking }) {
  // Fetching data, handling state, rendering complex UI...
}
```

### Styling

**Web (Tailwind CSS):**
```jsx
// Use Tailwind utility classes
<div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-lg">
  <span className="text-lg font-semibold text-primary">Title</span>
</div>
```

**Mobile (StyleSheet):**
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
```

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BookingCard.jsx` |
| Hooks | camelCase with `use` prefix | `useBooking.ts` |
| Utilities | camelCase | `formatCurrency.ts` |
| Types | PascalCase | `Booking.ts` |
| Constants | SCREAMING_SNAKE_CASE | `API_ENDPOINTS.ts` |

---

## Git Workflow

### Branch Naming

```
feature/short-description    # New features
fix/issue-description        # Bug fixes
docs/what-changed           # Documentation
refactor/what-changed       # Code refactoring
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

**Examples:**
```
feat(booking): add advance booking functionality

fix(tracking): resolve ETA calculation error

docs(readme): update installation instructions

refactor(auth): simplify login flow
```

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## Pull Request Process

### Before Submitting

1. **Update your branch** with the latest main
2. **Run linting**: `pnpm lint`
3. **Run type checking**: `pnpm type-check`
4. **Test your changes** manually
5. **Update documentation** if needed

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing performed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings introduced
```

### Review Process

1. Submit PR against `main` branch
2. Wait for automated checks to pass
3. Request review from maintainers
4. Address feedback and make changes
5. Once approved, maintainer will merge

---

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm --filter @matatu-connect/web test
pnpm --filter @matatu-connect/mobile test
```

### Writing Tests

**Unit Tests:**
```typescript
import { formatCurrency } from '../utils';

describe('formatCurrency', () => {
  it('formats amount with KSh prefix', () => {
    expect(formatCurrency(100)).toBe('KSh 100');
  });

  it('handles decimal amounts', () => {
    expect(formatCurrency(100.5)).toBe('KSh 100.5');
  });
});
```

**Component Tests:**
```jsx
import { render, screen } from '@testing-library/react';
import BookingCard from './BookingCard';

describe('BookingCard', () => {
  it('displays booking information', () => {
    const booking = { route: 'Thika - CBD', fare: 100 };
    render(<BookingCard booking={booking} />);
    
    expect(screen.getByText('Thika - CBD')).toBeInTheDocument();
    expect(screen.getByText('KSh 100')).toBeInTheDocument();
  });
});
```

---

## Documentation

### When to Update Docs

- Adding new features
- Changing existing behavior
- Adding new dependencies
- Modifying API contracts

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and quick start |
| `docs/PRD.md` | Product requirements |
| `docs/ARCHITECTURE.md` | Technical architecture |
| `docs/API.md` | API documentation |
| `docs/CONTRIBUTING.md` | This file |

### Code Comments

- Comment **why**, not **what**
- Keep comments up to date
- Use JSDoc for public functions

```typescript
/**
 * Calculates the total fare including platform fee
 * @param baseFare - The base fare amount in KES
 * @returns Object containing baseFare, platformFee, and total
 */
export function calculateTotalFare(baseFare: number) {
  // Platform fee is 15% to cover payment processing and operations
  const platformFee = Math.round(baseFare * 0.15);
  return {
    baseFare,
    platformFee,
    total: baseFare + platformFee,
  };
}
```

---

## Getting Help

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and ideas
- **Email** - info@matatuconnect.co.ke

---

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes
- Special mentions for significant contributions

---

Thank you for contributing to Ma3! Together, we're transforming Kenya's transport sector. 🚌
