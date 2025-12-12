# VectorShift Frontend Assessment - Testing Guide

This guide will help you test all functionalities of the application.

## Prerequisites

1. **Backend Server**: Should be running on http://localhost:8000
   ```bash
   cd backend
   python3 -m uvicorn main:app --reload
   ```

2. **Frontend Server**: Should be running on http://localhost:3000 or http://localhost:3001
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to the frontend URL.

---

## Part 1: Node Abstraction Testing

### Test 1.1: Verify Node Palette
- [ ] Check that the "Node Palette" section appears at the top
- [ ] Verify all 9 node types are visible:
  - Input
  - LLM
  - Output
  - Text
  - Conditional
  - Transform
  - Merge
  - Split
  - Filter
- [ ] Confirm all nodes have consistent purple styling

### Test 1.2: Drag and Drop Original Nodes
- [ ] Drag an **Input** node onto the canvas
  - Verify it appears with a name field and type dropdown
  - Check that it has a source handle (connection point) on the right side
- [ ] Drag an **Output** node onto the canvas
  - Verify it appears with a name field and type dropdown
  - Check that it has a target handle (connection point) on the left side
- [ ] Drag an **LLM** node onto the canvas
  - Verify it shows "LLM" title
  - Check that it has 2 target handles on the left (system, prompt)
  - Check that it has 1 source handle on the right (response)
- [ ] Drag a **Text** node onto the canvas
  - Verify it shows "Text" title
  - Check that it has a textarea input field
  - Verify it has a source handle on the right

### Test 1.3: Test New Demo Nodes
- [ ] Drag a **Conditional** node onto the canvas
  - Verify it has 1 target handle on the left
  - Verify it has 2 source handles on the right (true/false outputs)
  - Check that it has a condition input field
- [ ] Drag a **Transform** node onto the canvas
  - Verify it has 1 target handle and 1 source handle
  - Check that it has a transform type dropdown (uppercase, lowercase, etc.)
- [ ] Drag a **Merge** node onto the canvas
  - Verify it has 3 target handles on the left
  - Verify it has 1 source handle on the right
- [ ] Drag a **Split** node onto the canvas
  - Verify it has 1 target handle on the left
  - Verify it has 3 source handles on the right
  - Check that it has a delimiter input field
- [ ] Drag a **Filter** node onto the canvas
  - Verify it has 1 target handle on the left
  - Verify it has 2 source handles on the right (passed/filtered)
  - Check that it has a filter criteria input field

### Test 1.4: Verify Consistent Styling
- [ ] All nodes should have:
  - Rounded corners (12px border radius)
  - White background
  - Light gray border
  - Shadow effect
  - Consistent padding and spacing
- [ ] Hover over nodes - they should have a subtle hover effect

---

## Part 2: Styling Testing

### Test 2.1: Visual Design
- [ ] Check that the overall design is modern and clean
- [ ] Verify color scheme is consistent (purple primary color #6366f1)
- [ ] Check that buttons have hover effects
- [ ] Verify the toolbar has proper spacing and styling
- [ ] Check that the canvas area has a light gray background with grid pattern

### Test 2.2: Component Styling
- [ ] **Toolbar**: Should have white background, border at bottom
- [ ] **Node Palette buttons**: Should be purple, have hover effects
- [ ] **Submit button**: Should be purple, centered, with hover effect
- [ ] **Input fields**: Should have rounded borders, focus states
- [ ] **ReactFlow controls**: Should be styled (zoom controls, minimap)

### Test 2.3: Responsive Design
- [ ] Resize the browser window
- [ ] Verify components adapt appropriately
- [ ] Check that nodes remain usable at different sizes

---

## Part 3: Text Node Logic Testing

### Test 3.1: Dynamic Sizing
- [ ] Add a **Text** node to the canvas
- [ ] Type a short text (e.g., "Hello")
  - Verify the node width adjusts (minimum 200px)
- [ ] Type a longer text (e.g., "This is a very long text that should make the node wider")
  - Verify the node width increases (up to 400px max)
- [ ] Press Enter to add multiple lines
  - Verify the node height increases based on number of lines
  - Minimum height should be 80px

### Test 3.2: Variable Parsing - Basic
- [ ] In a Text node, type: `Hello {{ name }}`
  - Verify a new target handle appears on the LEFT side of the node
  - The handle should be positioned appropriately
- [ ] Type: `{{ input }} and {{ output }}`
  - Verify TWO target handles appear on the left side
  - Handles should be evenly distributed vertically

### Test 3.3: Variable Parsing - Edge Cases
- [ ] Test valid variable names:
  - `{{ variable }}` ✓
  - `{{ myVar }}` ✓
  - `{{ _private }}` ✓
  - `{{ $special }}` ✓
- [ ] Test invalid variable names (should not create handles):
  - `{{ 123invalid }}` ✗
  - `{{ invalid-name }}` ✗
- [ ] Test duplicate variables:
  - Type: `{{ input }} and {{ input }}`
  - Verify only ONE handle is created (duplicates are ignored)
- [ ] Test removing variables:
  - Type: `{{ input }}`
  - Then delete the variable text
  - Verify the handle disappears

### Test 3.4: Text Node with Variables - Full Workflow
- [ ] Create an **Input** node
- [ ] Create a **Text** node with text: `Hello {{ name }}, welcome!`
- [ ] Connect the Input node's output to the Text node's `{{ name }}` handle
- [ ] Verify the connection is successful
- [ ] Create an **Output** node
- [ ] Connect the Text node's output to the Output node
- [ ] Verify the full pipeline is connected

---

## Part 4: Backend Integration Testing

### Test 4.1: Submit Empty Pipeline
- [ ] Click the **"Submit Pipeline"** button with no nodes on canvas
- [ ] Verify a modal appears showing:
  - Number of Nodes: 0
  - Number of Edges: 0
  - Is DAG: Yes ✓ (empty graph is a DAG)

### Test 4.2: Submit Simple Valid Pipeline (DAG)
- [ ] Create a simple pipeline:
  1. Add an **Input** node
  2. Add a **Text** node
  3. Add an **Output** node
  4. Connect: Input → Text → Output
- [ ] Click **"Submit Pipeline"**
- [ ] Verify modal shows:
  - Number of Nodes: 3
  - Number of Edges: 2
  - Is DAG: Yes ✓

### Test 4.3: Submit Complex Valid Pipeline (DAG)
- [ ] Create a more complex pipeline:
  1. Add 2 **Input** nodes
  2. Add a **Merge** node
  3. Add a **Transform** node
  4. Add a **Split** node
  5. Add 2 **Output** nodes
  6. Connect: Input1 → Merge, Input2 → Merge
  7. Connect: Merge → Transform
  8. Connect: Transform → Split
  9. Connect: Split → Output1, Split → Output2
- [ ] Click **"Submit Pipeline"**
- [ ] Verify:
  - Correct node count
  - Correct edge count
  - Is DAG: Yes ✓

### Test 4.4: Submit Invalid Pipeline (Not a DAG - Cycle)
- [ ] Create a cycle:
  1. Add 2 nodes (e.g., **Input** and **Text**)
  2. Connect: Input → Text
  3. Connect: Text → Input (creates a cycle!)
- [ ] Click **"Submit Pipeline"**
- [ ] Verify modal shows:
  - Correct node count
  - Correct edge count
  - Is DAG: No ✗ (red indicator)

### Test 4.5: Submit Pipeline with Multiple Cycles
- [ ] Create a complex cycle:
  1. Add 3 nodes: **Input**, **Transform**, **Text**
  2. Connect: Input → Transform → Text → Input (cycle)
- [ ] Click **"Submit Pipeline"**
- [ ] Verify: Is DAG: No ✗

### Test 4.6: Test Modal Functionality
- [ ] After submitting, verify the modal:
  - [ ] Can be closed by clicking the "Close" button
  - [ ] Can be closed by clicking outside the modal (on the overlay)
  - [ ] Shows correct formatting and colors:
    - Green background for "Is DAG: Yes"
    - Red background for "Is DAG: No"
    - Large, readable numbers

### Test 4.7: Test Loading State
- [ ] Click **"Submit Pipeline"**
- [ ] Verify the button shows "Submitting..." while loading
- [ ] Verify the button is disabled during submission
- [ ] After response, button returns to normal state

### Test 4.8: Test Error Handling
- [ ] Stop the backend server
- [ ] Click **"Submit Pipeline"**
- [ ] Verify an error message appears in the modal:
  - "Failed to submit pipeline. Make sure the backend is running."
- [ ] Restart the backend server
- [ ] Try submitting again - should work now

---

## Additional Testing

### Test 5.1: Node Interactions
- [ ] **Move nodes**: Click and drag nodes around the canvas
- [ ] **Delete nodes**: Select a node and press Delete key
- [ ] **Edit node fields**: 
  - Change Input node name
  - Change Output node type
  - Modify Text node content
- [ ] **Connect nodes**: 
  - Drag from a source handle to a target handle
  - Verify connections are animated
  - Verify arrow markers appear on edges

### Test 5.2: Canvas Controls
- [ ] **Zoom**: Use + and - buttons or mouse wheel
- [ ] **Pan**: Click and drag the canvas background
- [ ] **Minimap**: Check the minimap in bottom-right corner
  - Verify it shows node positions
  - Verify different node types have different colors

### Test 5.3: Multiple Nodes of Same Type
- [ ] Add multiple **Input** nodes
- [ ] Verify each gets a unique ID (e.g., customInput-1, customInput-2)
- [ ] Verify all can be connected independently

### Test 5.4: Edge Cases
- [ ] Create a node with no connections (isolated node)
- [ ] Submit - should still be a valid DAG
- [ ] Create a node with multiple incoming connections
- [ ] Create a node with multiple outgoing connections
- [ ] Verify all connections work correctly

---

## Expected Results Summary

### Successful Tests Should Show:
1. ✅ All 9 node types work and are styled consistently
2. ✅ Text node resizes dynamically based on content
3. ✅ Text node creates handles for `{{ variables }}`
4. ✅ Submit button sends data to backend
5. ✅ Backend correctly calculates nodes, edges, and DAG status
6. ✅ Modal displays results in a user-friendly format
7. ✅ CORS is properly configured (no CORS errors in console)
8. ✅ All styling is modern and consistent

### Common Issues to Watch For:
- ❌ CORS errors in browser console
- ❌ Backend not responding (check if server is running)
- ❌ Nodes not appearing when dragged
- ❌ Connections not working
- ❌ Text node not resizing
- ❌ Variables not creating handles

---

## Quick Test Checklist

Use this quick checklist for a fast verification:

- [ ] Can drag all 9 node types onto canvas
- [ ] Nodes have consistent styling
- [ ] Can connect nodes together
- [ ] Text node resizes when typing
- [ ] Text node creates handles for `{{ variable }}`
- [ ] Submit button works
- [ ] Modal shows correct results
- [ ] DAG detection works (test with cycle)
- [ ] No console errors
- [ ] Styling looks modern and polished

---

## Troubleshooting

### If Submit Button Doesn't Work:
1. Check browser console for errors
2. Verify backend is running: `curl http://localhost:8000/`
3. Check CORS configuration in backend
4. Verify frontend URL matches allowed origins

### If Text Node Doesn't Resize:
1. Check browser console for errors
2. Verify ReactFlow is properly initialized
3. Check that updateNode is being called

### If Variables Don't Create Handles:
1. Verify regex pattern is correct
2. Check that variable names are valid JavaScript identifiers
3. Verify handles are being rendered in the component

---

**Happy Testing! 🚀**

