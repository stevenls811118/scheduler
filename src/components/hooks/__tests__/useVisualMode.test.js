import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "../useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  console.log("1st history and mode", result.current.history, result.current.mode);
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  console.log("2nd history and mode", result.current.history, result.current.mode);
  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);
  console.log("3rd history and mode", result.current.history, result.current.mode);
  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);
  console.log("4th history and mode", result.current.history, result.current.mode);
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
  console.log("5th history and mode", result.current.history, result.current.mode);
});

test("useVisualMode should not return to previous mode if already at initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
  console.log("history and mode", result.current.history, result.current.mode);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);

  console.log("final history and mode", result.current.history, result.current.mode);
});

test("useVisualMode should replace the current mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  console.log("1st history and mode", result.current.history, result.current.mode);

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  console.log("2nd history and mode", result.current.history, result.current.mode);
  // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);
  console.log("3rd history and mode", result.current.history, result.current.mode);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
  console.log("4th history and mode", result.current.history, result.current.mode);
});