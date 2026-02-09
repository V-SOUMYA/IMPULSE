<div align="center">
  <img width="1200" height="475" alt="SeeTheForce Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SeeTheForce  
### From Equation to Motion

SeeTheForce is an AI-powered web application that helps users understand classical physics by turning physics questions into simple visual animations and graphs.

The goal of this project is to make physics easier to understand by showing how equations relate to real motion.

---

## What does this project do?

- Takes a classical physics question as input  
- Uses the Gemini API to analyze the problem  
- Converts the physics solution into structured motion data  
- Displays:
  - **Physical motion** (an object moving in space)
  - **Mathematical representation** (a graph such as position vs time)

Both views update together, so users can see the same physics in two different ways.

---

## Physics topics covered

The project focuses mainly on core classical physics concepts, including:

- Kinematics  
  - Motion in 1D and 2D  
  - Uniform acceleration  
  - Free fall  
  - Projectile motion  

- Introductory Newton’s laws (simplified)
  - Motion under forces such as gravity or friction  

- Graph-based understanding
  - Position vs time  
  - Velocity vs time  

The animations are designed to be **clear and educational**, not overly complex.

---

## How does it work?

1. The user enters a physics question.
2. The Gemini API processes the question and generates motion data.
3. The frontend uses this data to render:
   - A moving object that represents real motion.
   - A graph that represents the same motion mathematically.
4. The animation and graph stay synchronized to help users understand the connection.

This is what the tagline **“From Equation to Motion”** represents.

---

## Running the project locally

### Requirements
- Node.js (version 18 or higher recommended)

### Steps

1. Install dependencies:
   ```bash
   npm install

2. Create or edit the .env.local file and add your Gemini API key:

   GEMINI_API_KEY=your_api_key_here

3. Start the development server:
   ```bash
   npm run dev

