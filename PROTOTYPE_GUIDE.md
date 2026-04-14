# Makati Milk Bank Inventory System - Prototype Guide

## 🎯 Capstone Defense Demo Flow

### **Complete Prototype Flow with Dark Mode**

1. **Login Page (Start in Dark Mode)**
   - Shows professional dark mode login with deep navy background (#0A0C14)
   - Teal logo, white text, and clean form inputs
   - Theme toggle in top right corner
   - Click "Login" to proceed

2. **Dashboard (Dark Mode)**
   - Top bar with theme toggle, notification bell, and user avatar
   - Welcome banner with quick tips
   - Stat cards showing key metrics with vibrant colored numbers
   - Progress bars showing milk flow
   - Recent activity table

3. **Toggle to Light Mode**
   - Click the pill-shaped theme toggle in top bar
   - **Instant transition** - all colors switch seamlessly
   - Dashboard now shows soft teal gradient background
   - White cards with clean borders

4. **Inventory Page**
   - Click "Inventory" in sidebar
   - Search bar and filter controls
   - Data table with alternating row colors
   - Status badges (Active, Pasteurized, Dispensed)
   - Expiry warnings with red tint background

5. **Add New Lot Modal**
   - Click "Add New Lot" button
   - Modal slides in with dark overlay
   - Form with all required fields
   - Teal focus states on inputs
   - Cancel/Save buttons at bottom

6. **Donors Page**
   - Click "Donors" in sidebar
   - Donor list with contact info and status
   - Edit and View History action buttons

7. **Donor History Panel**
   - Click "View History" on any donor
   - Panel slides in from right
   - Shows donation timeline with volume bars
   - Total donated summary at bottom

## 🎨 Theme Features

### **Pill-Shaped Theme Toggle**
- **Dimensions**: 52px × 28px
- **Light Mode**: White background, amber sun icon (left), white thumb (right)
- **Dark Mode**: Deep navy background (#1A1D27), blue moon icon (right), teal thumb (left)
- **Animation**: Smooth 300ms transition for all elements
- **Location**: Top right corner next to notification bell and avatar

### **Color System**

**Light Mode:**
- Background: White (#FFFFFF)
- Cards: White with subtle borders
- Text: Dark gray/black
- Accents: Vibrant teal, blue, amber

**Dark Mode:**
- Background: Deep navy (#0F1117)
- Cards: #1E2130 with #2A2D3E borders
- Sidebar: #13151F (extra deep)
- Text: White (#F0F2F8) and muted gray (#9CA3B8)
- Accents: Same vibrant colors for consistency

## 🚀 Interactive Elements

### **Navigation**
- Sidebar navigation with colored dot indicators
- Active state: teal border + soft glow background
- Hover state: subtle gray overlay
- Smooth dissolve transitions between pages

### **Tables**
- Uppercase muted column headers
- Alternating row colors
- Ghost-style action buttons
- Expiry warnings with visual indicators

### **Modals & Panels**
- Dark overlay (#00000080 in dark mode)
- Slide-in animations
- Rounded corners (12px)
- Teal focus glows on form inputs

## 📊 Pages Included

1. **Dashboard** - System overview with stats and activity
2. **Inventory** - Milk lot management with search and filters
3. **Donors** - Donor database with history tracking
4. **Beneficiaries** - Baby care recipient management
5. **Reports** - Charts and analytics with export options
6. **SMS Logs** - Message history and delivery status
7. **Users** - System user administration

## 🎭 Comparison Views

### **Access Comparison Frames**
To view side-by-side light/dark comparisons for presentation slides:

- Change `currentView` in App.tsx to `'comparison'` for theme comparison
- Change to `'login-comparison'` for login page comparison
- These show professional presentation-ready layouts

## 💡 Key Demo Talking Points

1. **Professional Medical Design** - Calm, deep navy aesthetic inspired by medical monitoring systems
2. **Instant Theme Switching** - Entire app adapts with one click using CSS variables
3. **Accessibility** - High contrast, clear labels, proper focus states
4. **Smooth Animations** - Dissolve transitions, slide-in panels, instant theme swap
5. **Complete System** - Full CRUD operations, real-time updates, comprehensive reporting
6. **Hospital-Style UI** - Clean, trustworthy, minimal design suitable for medical environments

## 🎬 Demo Tips

1. **Start in dark mode** to show modern aesthetic
2. **Toggle to light** mid-demo to showcase instant switching
3. **Show the expiry warning** feature in inventory (rows with red tint)
4. **Open the donor history panel** to demonstrate smooth slide-in
5. **Highlight the pill toggle** animation (smooth thumb movement)
6. **Show both login designs** side-by-side for visual impact

---

**Built for Capstone Defense 2026**  
*Makati Medical Center - Milk Bank Inventory Management System*
