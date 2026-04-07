/**
 * @file Home page — redirects to Puck-rendered /home or login.
 */
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/home');
}
