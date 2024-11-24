
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionData, useNavigation, Form as RouterForm, FormMethod, Params, json, redirect, useLocation } from 'react-router-dom';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

// Schéma de validation Zod
const schema = z.object({
  title: z.string().min(1, { message: 'Le titre est requis' }),
  content: z.string().min(10, { message: 'Le contenu doit avoir au moins 10 caractères' }),
});

type ArticleFormValues = z.infer<typeof schema>;

interface ActionData {
  errors?: Record<string, string[]>;
  message?: string;
}

interface ArticleFormProps {
  method: FormMethod;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ method }) => {
  const location = useLocation();
  const navigation = useNavigation();
  const data: ActionData = useActionData() as ActionData;
  const { toast } = useToast();
  const isSubmitting = navigation.state === 'submitting';
  const { article } = location.state || {};
  const buttonTitle = method === 'post' ? 'Créer' : 'Mettre à jour';

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article?.title || '',
      content: article?.content || '',
    },
  });

  useEffect(() => {
    if (data && data.errors) {
      Object.values(data.errors).forEach((err) => {
        toast({
          title: 'Erreur',
          description: err,
          variant: 'destructive',
        });
      });
    }

    if (data && data.message) {
      toast({
        title: 'Notification',
        description: data.message,
        variant: 'default',
      });
    }
  }, [data, toast]);

  return (
    <Form {...form}>
      <RouterForm
        method={method}
        className='shadow p-2 bg-white shadow-lg rounded-lg space-y-6 mt-6 border border-blue-500 md:w-1/2 md:mx-auto md:p-6'
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Créer un Article
        </h1>

        {/* Champ Titre */}
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="block text-sm font-medium text-gray-700">Titre</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Entrez le titre de l'article"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs">{form.formState.errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Champ Contenu */}
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="block text-sm font-medium text-gray-700">Contenu</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Entrez le contenu de l'article"
                  {...field}
                  className="h-[200px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs">{form.formState.errors.content?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button
            disabled={isSubmitting}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md border hover:bg-white hover:border-blue-500 hover:text-blue-500 cursor-pointer"
          >
            {isSubmitting ? 'En cours...' : buttonTitle}
          </Button>
        </div>
      </RouterForm>
    </Form>
  );
};

export default ArticleForm;