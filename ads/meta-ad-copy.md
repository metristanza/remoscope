# Remoscope — Meta (Facebook/Instagram) Ad Copy

## Campaign Structure
- **Objective:** Lead Generation (or Traffic → Landing Page with email signup)
- **Budget:** $5-10/day per vertical, run 2 weeks to validate
- **Audience targeting by vertical below**

---

## 1. Insurance — `/insurance`

**Target audience:** Insurance adjusters, claims managers, insurance agency owners, people with job titles containing "claims," "underwriter," "adjuster"

### Ad Set A — Pain Point
**Primary text:**
Your adjuster is booked for 3 weeks. The claim is sitting. The customer is calling.

What if you could verify the damage today — from your desk?

Remoscope sends a verified local agent to any claim site for live video inspection. Same-day. Geotagged. Timestamped.

Join the waitlist →

**Headline:** Verify Claims Without Sending an Adjuster
**Description:** Live video from any location. Same-day turnaround. Cut field costs 70%.
**CTA button:** Sign Up

### Ad Set B — Speed
**Primary text:**
Live video from any claim site in hours, not days.

No flights. No hotels. No scheduling headaches. Just a verified agent on the ground, streaming directly to your desk.

Remoscope is changing how insurance teams verify claims. Get early access.

**Headline:** Same-Day Claim Verification — From Anywhere
**Description:** Verified agents stream live from the scene. Geotagged, timestamped footage.
**CTA button:** Learn More

---

## 2. Real Estate — `/realestate`

**Target audience:** Real estate investors, property managers, real estate agents, people interested in BiggerPockets, Zillow, commercial real estate

### Ad Set A — Remote Investor
**Primary text:**
Found a deal 3 states away?

Before you book a flight, send a Remoscope agent. Live video walkthrough of the property, the street, the neighborhood — all from your laptop.

See what listing photos won't show you. Join the waitlist.

**Headline:** See Any Property Before You Fly Out
**Description:** Live video walkthroughs from verified local agents. Know what you're buying.
**CTA button:** Sign Up

### Ad Set B — Portfolio
**Primary text:**
Managing properties you haven't visited in months?

Remoscope agents do live video check-ins — exterior condition, curb appeal, tenant activity. On your schedule, from your desk.

Stop wondering. Start seeing.

**Headline:** Remote Property Checks — Live Video, Any Location
**Description:** Verified agents on the ground. Geotagged, timestamped footage you can keep.
**CTA button:** Learn More

---

## 3. Events — `/events`

**Target audience:** Event planners, wedding planners, corporate event managers, people interested in event planning, conference organizers

### Ad Set A — Venue Scouting
**Primary text:**
Evaluating venues in 5 different cities?

Stop flying to each one. Remoscope agents give you live video tours — walk through the space, check the layout, ask questions in real-time.

Scout 5 venues in a single afternoon. From your desk.

**Headline:** Scout Venues Without Leaving Your Desk
**Description:** Live video tours from verified local agents. See what photos can't show you.
**CTA button:** Sign Up

### Ad Set B — Beyond the Brochure
**Primary text:**
Venue photos are flattering. Reality isn't always.

Get a live, unfiltered video walkthrough before you commit. Our local agents show you exactly what the space looks like today — dimensions, condition, vibe.

No more surprises on event day. Join the waitlist.

**Headline:** Live Venue Tours — See the Real Space
**Description:** Interactive video walkthroughs. Direct the agent in real-time. Decide faster.
**CTA button:** Learn More

---

## 4. Verification — `/verification`

**Target audience:** Home service business owners, property managers, franchise operators, cleaning company owners, people interested in remote business management, lead generation agencies

### Ad Set A — Trust Issue
**Primary text:**
You run the business. Someone else does the work. How do you know it's done right?

Remoscope sends a verified local agent to inspect completed jobs — live video, direct from the site. No more hoping. No more callbacks.

One bad review costs more than 100 verifications.

**Headline:** Verify Local Work Without Being There
**Description:** Live video inspections from verified agents. Protect your reputation at scale.
**CTA button:** Sign Up

### Ad Set B — Scale
**Primary text:**
Expanding into new cities but can't be everywhere at once?

Remoscope agents are already there. Live video quality checks on your subcontractors, your crews, your jobs — from your desk.

Scale without sacrificing quality. Join the waitlist.

**Headline:** Quality Control for Remote Operations
**Description:** Verified agents inspect work on-site. Live video, timestamped proof.
**CTA button:** Learn More

---

## 5. Breaking News — `/news`

**Target audience:** Journalists, news editors, news producers, media professionals, freelance reporters, people working at news organizations, people interested in journalism

### Ad Set A — Speed to Scene
**Primary text:**
Breaking news won't wait for your camera crew.

Remoscope dispatches verified agents already near the scene — live, directed footage in minutes. Your producer controls the stream: "pan left," "get closer," "interview bystanders."

Authenticated. Geotagged. Footage you can stand behind.

**Headline:** Live Ground Footage Before Any Crew Arrives
**Description:** Verified agents stream from breaking news scenes in minutes. Directed in real-time.
**CTA button:** Sign Up

### Ad Set B — Bureau-Free
**Primary text:**
You don't have a bureau in every city. Now you don't need one.

Remoscope's network of verified agents covers the country. Breaking story in a city where you have no one? Dispatch an agent in minutes.

Real-time, authenticated, directed video. The stringer network of the future.

**Headline:** Cover Any City — No Bureau Required
**Description:** On-demand verified video stringers. Identity-checked, geotagged, timestamped.
**CTA button:** Learn More

---

## Creative Notes

### Image/Video Recommendations
- **Insurance:** Split screen — adjuster at desk watching live feed of property damage
- **Real Estate:** Phone screen showing live property walkthrough, investor on laptop
- **Events:** Event planner at desk with multiple venue streams on screen
- **Verification:** Before/after — messy job vs. verified clean job on live video
- **News:** Breaking news scene with Remoscope agent streaming, newsroom watching

### General Tips
- Use **square (1:1)** format for feed, **9:16** for Stories/Reels
- Keep primary text under 125 characters for mobile (first line visible)
- Test video ads (even simple screen recordings) — they typically outperform static
- Start with **Advantage+ placements** and let Meta optimize
- Set up the **Meta Pixel** on each landing page for conversion tracking

### Pixel Setup
Add this to each landing page `<head>`:
```html
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

Track signups as `Lead` event in the Mailchimp submit handler:
```javascript
fbq('track', 'Lead', { content_name: source });
```
