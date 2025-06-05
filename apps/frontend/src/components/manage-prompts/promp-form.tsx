import { useState } from 'react';
import * as z from 'zod';

import { usePrompts } from '@/store/prompts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

import type { Prompt } from '@/types/propmt';


const promptSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type PromptFormData = z.infer<typeof promptSchema>;

interface PromptFormProps {
  prompt?: Prompt | null;
  handleCloseForm: () => void;
}

export const PromptForm = ({ prompt, handleCloseForm }: PromptFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PromptFormData>({
    title: prompt?.title ?? '',
    content: prompt?.content ?? '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PromptFormData, string>>>({});

  const { addPrompt, updatePrompt } = usePrompts();

  const validateForm = (): boolean => {
    try {
      promptSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof PromptFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof PromptFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      if (prompt) {
        // Update existing prompt
        updatePrompt(prompt.id, formData);
      } else {
        // Add prompt to store
        addPrompt({
          title: formData.title,
          content: formData.content,
        })
      }
      // Clear form
      setFormData({ title: '', content: '' });
      // Close form
      handleCloseForm();
    } catch (error) {
      console.error('Failed to save prompt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof PromptFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Prompt Title"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
          )}

          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Prompt Content"
            className={errors.content ? "border-red-500" : ""}
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">{errors.content}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            Save Prompt
          </Button>
          <Button type="button" variant="outline" onClick={handleCloseForm}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
