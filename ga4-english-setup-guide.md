# 🎯 Google Analytics 4 - Quick Setup Guide (English Interface)

## 📊 Custom Dimensions Setup

### Step 1: Navigate to Custom Definitions
1. Open Google Analytics 4: [analytics.google.com](https://analytics.google.com)
2. Click **Admin** ⚙️ (gear icon at bottom left)
3. In the **Property** column, click **Custom definitions**
4. Click **Create custom dimensions**

### Step 2: Create 3 Custom Dimensions

#### Dimension 1: User Language
```
Dimension name: User Language
Scope: Event
Event parameter: user_language
Description: Selected user interface language
```
Click **Save**

#### Dimension 2: Button Location
```
Dimension name: Button Location
Scope: Event
Event parameter: button_location
Description: Location of clicked CTA button
```
Click **Save**

#### Dimension 3: Engagement Level
```
Dimension name: Engagement Level
Scope: Event
Event parameter: engagement_level
Description: User engagement level classification
```
Click **Save**

## 🎯 Conversion Goals Setup

### Step 1: Navigate to Events
1. Stay in **Admin** ⚙️
2. In the **Property** column, click **Events**
3. You'll see a list of events from your website

### Step 2: Mark Events as Conversions
Find these events and toggle **Mark as conversion** ON:

#### Event 1: cta_click
- Find `cta_click` in the events list
- Toggle **Mark as conversion** ✅ ON
- This tracks Telegram bot clicks

#### Event 2: high_engagement
- Find `high_engagement` in the events list
- Toggle **Mark as conversion** ✅ ON
- This tracks users with 75%+ scroll

#### Event 3: language_change
- Find `language_change` in the events list
- Toggle **Mark as conversion** ✅ ON
- This tracks language switching

## 🔍 Verification Steps

### Check Custom Dimensions
1. Go to **Reports** → **Engagement** → **Events**
2. Click on any event (e.g., `cta_click`)
3. You should see your custom parameters:
   - `user_language`
   - `button_location`
   - `engagement_level`

### Check Conversions
1. Go to **Reports** → **Conversions** → **Conversion events**
2. You should see:
   - `cta_click` marked as conversion
   - `high_engagement` marked as conversion
   - `language_change` marked as conversion

## 🚨 Troubleshooting

### Can't find "Custom definitions"?
- Make sure you're in the **Property** column (middle column)
- Scroll down in the Property section
- Look for "Custom definitions" under "Data display"

### Can't find "Events"?
- Make sure you're in the **Property** column
- Look for "Events" under "Data collection and modification"

### Events not showing up?
- Wait 24-48 hours for events to appear
- Make sure your website is sending events (test with `testGoogleAnalytics()`)
- Check that your Measurement ID is correct: `G-066XGVT1R2`

## ✅ Quick Checklist

- [ ] Created "User Language" custom dimension
- [ ] Created "Button Location" custom dimension  
- [ ] Created "Engagement Level" custom dimension
- [ ] Marked `cta_click` as conversion
- [ ] Marked `high_engagement` as conversion
- [ ] Marked `language_change` as conversion
- [ ] Verified events appear in Reports → Events
- [ ] Verified conversions appear in Reports → Conversions

## 🎉 You're Done!

Your Google Analytics is now fully configured to track:
- ✅ CTA button clicks with location details
- ✅ Language switching behavior
- ✅ User engagement levels
- ✅ Navigation patterns
- ✅ Scroll depth metrics

All events will now be properly categorized and available for detailed analysis!