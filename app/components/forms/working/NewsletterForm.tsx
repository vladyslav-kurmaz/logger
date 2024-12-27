'use client';

import { useAtom } from 'jotai';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { newsletterFormAtom } from '@/lib/atoms/form';
import { useState } from 'react';

export function NewsletterForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useAtom(newsletterFormAtom);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.preferences.length === 0) {
      newErrors.preferences = 'Please select at least one preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast({
        title: "Newsletter subscription successful",
        description: "Thank you for subscribing!",
      });
      console.log(formData);
      setFormData({ email: '', preferences: [] });
    }
  };

  const handlePreferenceChange = (item: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: checked
        ? [...prev.preferences, item]
        : prev.preferences.filter(p => p !== item)
    }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Preferences</label>
          <div className="space-y-2">
            {["News", "Updates", "Events"].map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.preferences.includes(item)}
                  onChange={(e) => handlePreferenceChange(item, e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
          {errors.preferences && (
            <p className="text-sm text-red-500 mt-1">{errors.preferences}</p>
          )}
        </div>

        <Button type="submit">Subscribe</Button>
      </form>
    </Card>
  );
}