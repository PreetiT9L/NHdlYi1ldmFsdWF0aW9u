import calculateRelativeDate from "./relative-date";
import { expect } from "@open-wc/testing";

describe("Calculate Relative Date", () => {
  // Test case for today
  test('returns "Today" for the current date', () => {
    const today = new Date();
    expect(calculateRelativeDate(today)).toBe("Today");
  });

  // Test case for yesterday
  test('returns "Yesterday" for yesterday\'s date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(calculateRelativeDate(yesterday)).toBe("Yesterday");
  });

  // Add more test cases for other scenarios (e.g., this week, last week, this month, last month, etc.)
  // For example:
  test('returns "This week" for a date within the current week', () => {
    const thisWeekDate = new Date();
    thisWeekDate.setDate(thisWeekDate.getDate() - 3); // Assuming 3 days ago is still within the current week
    expect(calculateRelativeDate(thisWeekDate)).toBe("This week");
  });
});
testCalculateRelativeDate();
