import {
  Hemisphere,
  LunarPhase,
  Moon,
  NorthernHemisphereLunarEmoji,
  SouthernHemisphereLunarEmoji,
} from "lunarphase-js";

/**
 * Gets the moon phase based on the date
 * @param date - string representing the date
 * @returns - moon phase, moon phase emoji and message about fishing conditions
 */

export const getMoonPhase = (
  date: string
): {
  moonPhase: LunarPhase;
  moonEmoji: SouthernHemisphereLunarEmoji | NorthernHemisphereLunarEmoji;
  message: string;
} => {
  const moonPhase = Moon.lunarPhase(new Date(date));
  const moonEmoji = Moon.lunarPhaseEmoji(new Date(date), {
    hemisphere: Hemisphere.NORTHERN,
  });
  let message: string = getFishingConditions(moonPhase);

  return { moonPhase, moonEmoji, message };
};

/**
 * Gets the fishing conditions based on the moon phase
 * @param phase - string representing the moon phase
 * @returns - message stating the fishing conditions
 */
function getFishingConditions(phase: LunarPhase): string {
  let message: string;

  switch (phase) {
    case LunarPhase.NEW:
      message =
        "New Moon: Great time to fish! Fish are more active in the darker conditions, especially at dawn and dusk.";
      break;
    case LunarPhase.WAXING_CRESCENT:
      message =
        "Waxing Crescent: Fish are starting to get more active, especially with the increasing light at night. Try early mornings or late evenings.";
      break;
    case LunarPhase.FIRST_QUARTER:
      message =
        "First Quarter: A decent time for fishing, but not as active as during the full moon. Fish are still feeding, so try daytime fishing.";
      break;
    case LunarPhase.WAXING_GIBBOUS:
      message =
        "Waxing Gibbous: The fish are becoming more active as the moon continues to brighten. Evening fishing is ideal.";
      break;
    case LunarPhase.FULL:
      message =
        "Full Moon: Excellent time to fish, especially at night. The bright moonlight encourages fish to feed, particularly predators.";
      break;
    case LunarPhase.WANING_GIBBOUS:
      message =
        "Waning Gibbous: Fish may be less active, but early mornings or late evenings can still provide good opportunities.";
      break;
    case LunarPhase.LAST_QUARTER:
      message =
        "Last Quarter: Fish activity is usually lower, but early morning and late evening fishing can still yield good results.";
      break;
    case LunarPhase.WANING_CRESCENT:
      message =
        "Waning Crescent: A challenging time for fishing, as fish tend to be less active. Stick to early or late fishing for the best chance.";
      break;
    default:
      message = "Unknown phase: Can't determine fishing conditions.";
      break;
  }

  return message;
}
