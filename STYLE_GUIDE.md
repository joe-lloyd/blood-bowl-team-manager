# Blood Bowl Team Manager style guide

This reference describes the styles in `src/components` and `src/styles/globals.css`. Colors are literals in the components, rather than shared theme tokens.

## Color palette

| Color      | Value     | Uses                                                             |
| ---------- | --------- | ---------------------------------------------------------------- |
| Blue       | `#1d3860` | App bar, primary buttons, text, and borders                      |
| Red        | `#922d26` | Hero and footer backgrounds, destructive buttons, checked toggle |
| Gold       | `#eaaa02` | Navigation links and hero titles                                 |
| Parchment  | `#fffef0` | Parchment background                                             |
| Light blue | `#e0f0ff` | Table and form backgrounds                                       |
| Hover blue | `#d4e8ff` | Table row hover, occupied player slots, disabled button text     |
| Dark blue  | `#092540` | Primary button hover and list backgrounds                        |
| Dark red   | `#701d1a` | Danger button and inline link hover                              |
| Off-white  | `#f9f9f9` | Even table rows and disabled button backgrounds                  |
| Brown      | `#8a4d0f` | Inset parchment shadows                                          |

## Typography

`globals.css` sets the root font size to 16px. `Hero.tsx` uses 3.5rem, weight 700, italic, gold uppercase titles. `TextBorderBox.tsx` sets its own section titles to 2rem in blue and body text to 1rem with a 1.6 line height. Its drop cap is 3rem.

`ComponentWarehouse/Titles.tsx` exports `Title` as an h1, and `SeasonTitle` and `Subtitle` as h2 elements. These exports do not set font sizes. `SeasonTitle` has gold text on red, while the others use blue text.

## Components

Paths below are relative to `src/components`.

| Source                                      | Exports or component                                                | Behavior                                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `AppBar.tsx`                                | `AppBar`                                                            | Logo and navigation with authentication links                                                             |
| `Hero.tsx`, `HomeHero.tsx`                  | `Hero`, `HomeHero`                                                  | Angled headers with SVG backgrounds                                                                       |
| `Footer.tsx`                                | `Footer`                                                            | Bottom navigation and angled background                                                                   |
| `ComponentWarehouse/Parchment.tsx`          | `Parchment`                                                         | Background with inset shadows and an SVG filter; low intensity uses absolute positioning, otherwise fixed |
| `ComponentWarehouse/ContentContainer.tsx`   | `ContentContainer`                                                  | Centered wrapper, 1300px maximum; 1024px below 1440px, full width below 768px                             |
| `ComponentWarehouse/MinHeightContainer.tsx` | Default export                                                      | Flex wrapper with minimum height `calc(100vh - 47.5px)`                                                   |
| `ComponentWarehouse/Button.tsx`             | `Button`, `DangerButton`, `RemoveButton`, `InlineLink`              | Blue primary button, red destructive buttons, and a clickable red span                                    |
| `ComponentWarehouse/Toggle.tsx`             | `Toggle`                                                            | Checkbox switch, blue unchecked and red checked                                                           |
| `TeamBuilder/Select.tsx`                    | `Select`                                                            | Dropdown with a custom arrow icon                                                                         |
| `TextBorderBox.tsx`                         | `TextBorderBox`                                                     | Bordered text with a drop cap                                                                             |
| `ComponentWarehouse/Table.tsx`              | `TableWrapper`, `MainTable`, `TableHeader`, `TableRow`, `TableCell` | Scrollable table, blue header, off-white even rows, blue hover                                            |
| `TeamBuilder/TeamBuilder.tsx`               | `TeamBuilder`                                                       | Team creation form                                                                                        |
| `LeagueForm.tsx`                            | `LeagueForm`                                                        | League creation form                                                                                      |
| `MyTeamsList.tsx`, `MyLeaguesList.tsx`      | `MyTeamsList`, `MyLeaguesList`                                      | Lists of the user's teams and leagues                                                                     |

## Component dimensions and states

`Button` uses 10px padding, a 4px radius, and a 0.3s background transition. Disabled buttons use off-white backgrounds, pale blue text, and a forbidden cursor. They do not reduce opacity. `RemoveButton` and `InlineLink` have no radius declaration.

`Toggle` has a 60px by 34px track with a 34px radius and a 26px circular thumb. `TextBorderBox` uses a 2px blue border and 20px padding. Tables use 3px outer side borders and 1px cell borders. These are component values, not a global spacing or border rule.
