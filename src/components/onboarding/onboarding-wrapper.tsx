"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { OnboardingModal } from "./onboarding-modal";

export function OnboardingWrapper() {
  const { showOnboarding, isLoading, completeOnboarding, skipOnboarding } = useOnboarding();

  if (isLoading || !showOnboarding) return null;

  return (
    <OnboardingModal
      open={true}
      onComplete={completeOnboarding}
      onSkip={skipOnboarding}
    />
  );
}
