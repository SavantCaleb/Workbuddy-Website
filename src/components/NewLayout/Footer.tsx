import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-ink text-paper py-20 grain">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-paper rounded-md flex items-center justify-center">
                <span className="text-ink font-display text-xl italic leading-none">w</span>
              </div>
              <span className="font-display text-2xl tracking-tight">WorkBuddy</span>
            </div>
            <p className="font-display text-3xl italic max-w-sm leading-tight">Built for the people who run the place.</p>
          </div>
          <div>
            <p className="eyebrow mb-4 text-paper/40">Product</p>
            <ul className="space-y-3 text-paper/80">
              <li><Link to="/" className="hover:text-rust transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-rust transition-colors">Pricing</Link></li>
              <li><Link to="/free-report" className="hover:text-rust transition-colors">Book a Free Call</Link></li>
              <li><Link to="/customers" className="hover:text-rust transition-colors">Customers</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-paper/40">Get In Touch</p>
            <ul className="space-y-3 text-paper/80">
              <li><Link to="/about" className="hover:text-rust transition-colors">About</Link></li>
              <li>Text: <span className="font-mono">(860) 477-9542</span></li>
              <li>caleb@getworkbuddy.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-paper/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-paper/50">&copy; {new Date().getFullYear()} WorkBuddy. Made for local business owners.</p>
          <div className="flex items-center gap-6 text-sm text-paper/50">
            <Link to="/privacy" className="hover:text-rust transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-rust transition-colors">Terms of Service</Link>
          </div>
          <p className="text-sm text-paper/50 font-mono">Powered by AI · Run by humans</p>
        </div>
      </div>
    </footer>
  );
};
