import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useActionData, useNavigation, Form as RouterForm, Link } from 'react-router-dom';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

// Schéma de validation Zod
const schema = z.object({
  email: z.string().email({ message: 'Email invalide' }).nonempty({ message: 'Le pseudo est requis' }),
  password: z.string().min(6, { message: 'Le mot de passe doit avoir au moins 6 caractères' }),
});

type AuthFormValues = z.infer<typeof schema>;

interface ActionData {
  errors?: Record<string, string[]>;
  message?: string;
}

const AuthForm: React.FC = () => {
  const data: ActionData = useActionData() as ActionData; // Utilisation de useActionData pour récupérer les erreurs du backend
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  // Utilisation de react-hook-form avec zod
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema), // Liaison avec le schéma de validation Zod
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Affichage des erreurs du backend
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
        variant: 'destructive',
      });
    }
  }, [data, toast]);

  return (
    <Form {...form}>
      <RouterForm 
        method="post"
        className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6 border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? 'Se connecter' : 'Inscription'}
        </h1>

        {/* Champ Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="block text-sm font-medium text-gray-700">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Entrez votre email"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs">{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Champ Mot de passe */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="block text-sm font-medium text-gray-700">Mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs">{form.formState.errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Liens de changement de mode */}
        <div className="flex justify-between items-center mt-4">
          <Link
            to={`?mode=${isLogin ? 'register' : 'login'}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            {isLogin ? 'Inscription' : 'Connexion'}
          </Link>
          <Button
            disabled={isSubmitting}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting ? 'En cours...' : 'Go !'}
          </Button>
        </div>
      </RouterForm>
    </Form>
  );
};

export default AuthForm;
