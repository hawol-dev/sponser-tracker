"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const hasCompletedOnboarding = user.user_metadata?.onboarding_completed === true;
        setShowOnboarding(!hasCompletedOnboarding);
      }
      setIsLoading(false);
    };
    checkOnboardingStatus();
  }, [supabase.auth]);

  const completeOnboarding = useCallback(async () => {
    const { error } = await supabase.auth.updateUser({
      data: { onboarding_completed: true }
    });
    if (!error) {
      setShowOnboarding(false);
    }
    return !error;
  }, [supabase.auth]);

  const skipOnboarding = useCallback(async () => {
    return await completeOnboarding();
  }, [completeOnboarding]);

  return {
    showOnboarding,
    isLoading,
    completeOnboarding,
    skipOnboarding,
  };
}
