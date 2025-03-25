import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

interface FormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: FormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  });

  // Validate the form
  const validateForm = useCallback(
    (values: T): Partial<Record<keyof T, string>> => {
      if (!validate) return {};
      const errors = validate(values);
      return errors;
    },
    [validate]
  );

  // Handle field change
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      
      // Special handling for checkboxes
      let newValue: any = value;
      if (type === 'checkbox') {
        newValue = (e.target as HTMLInputElement).checked;
      }

      // Update values and touched state
      setFormState((prev) => {
        const newValues = { ...prev.values, [name]: newValue };
        const errors = validateForm(newValues);
        const isValid = Object.keys(errors).length === 0;
        
        return {
          ...prev,
          values: newValues,
          touched: { ...prev.touched, [name]: true },
          errors,
          isValid,
        };
      });
    },
    [validateForm]
  );

  // Handle form blur
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    
    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const errors = validateForm(formState.values);
      const isValid = Object.keys(errors).length === 0;
      
      setFormState((prev) => ({
        ...prev,
        errors,
        isValid,
        // Mark all fields as touched on submit
        touched: Object.keys(prev.values).reduce((acc, key) => {
          return { ...acc, [key]: true };
        }, {}),
      }));
      
      if (!isValid) return;
      
      setFormState((prev) => ({ ...prev, isSubmitting: true }));
      
      try {
        await onSubmit(formState.values);
      } finally {
        setFormState((prev) => ({ ...prev, isSubmitting: false }));
      }
    },
    [formState.values, onSubmit, validateForm]
  );

  // Reset the form
  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
    });
  }, [initialValues]);

  // Set a specific field value
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setFormState((prev) => {
      const newValues = { ...prev.values, [name]: value };
      const errors = validateForm(newValues);
      const isValid = Object.keys(errors).length === 0;
      
      return {
        ...prev,
        values: newValues,
        errors,
        isValid,
      };
    });
  }, [validateForm]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
} 