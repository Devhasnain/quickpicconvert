import { Zap } from 'lucide-react';
import Link from 'next/link';


type Props = {
    className?:string
}


const Logo = ({className}:Props) => {
  return (
   <Link href="/" className={`flex items-center gap-2 group ${className}`}>
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col justify-center text-xl font-bold text-foreground">
              <span style={{lineHeight:"20px"}} className="">Quick Pic</span>
              <span style={{lineHeight:"20px"}} className="gradient-text">Convert</span>
            </div>
          </Link>

  )
}

export default Logo