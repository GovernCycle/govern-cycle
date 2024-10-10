import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CodeShowcase } from '@/components/home/CodeShowcase';
import { StarField } from '@/components/shared/StarField';
import { codeToHtml } from 'shiki';
import spaceSpotlight from '@/images/space-spotlight.png';

export function InteractiveCodeSection() {
  const [defaultHTML, setDefaultHTML] = useState<string | null>(null); // Allow both 'string' and 'null'
  const [loading, setLoading] = useState(true);

  const sampleCodeBlock = `module.exports = leftpad;

function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;

  if (!ch && ch != 0) ch = ' ';

  len = len - str.length;

  while (i++ < len) {
    str = ch + str;
  }
  return str;
}
`;

  useEffect(() => {
    async function fetchCodeHtml() {
      const html = await codeToHtml(sampleCodeBlock, {
        lang: 'javascript',
        theme: 'material-theme-palenight',
      });
      setDefaultHTML(html); // This should now work without type issues
      setLoading(false); // Set loading to false once it's resolved
    }

    fetchCodeHtml();
  }, []);

  if (loading) {
    return <div>Loading code block...</div>;
  }

  const features = [
    {
      title: 'Real-time collaboration',
      description:
        'Seasonal latte black java dark blue fair grounds barista black origin french caffeine body. ',
      icon: 'ClockIcon',
      codeBlocks: [defaultHTML!, defaultHTML!], // Assert that the value is non-null at this point
    },
    {
      title: 'Customize your stack',
      description:
        'Seasonal latte black java dark blue fair grounds barista black origin french caffeine body. ',
      icon: 'RectangleStackIcon',
      codeBlocks: [defaultHTML!, defaultHTML!],
    },
    {
      title: 'Port to any environment',
      description:
        'Seasonal latte black java dark blue fair grounds barista black origin french caffeine body. ',
      icon: 'ComputerDesktopIcon',
      codeBlocks: [defaultHTML!, defaultHTML!],
    },
    {
      title: 'Integrate modern tools',
      description:
        'Seasonal latte black java dark blue fair grounds barista black origin french caffeine body. ',
      icon: 'SquaresPlusIcon',
      codeBlocks: [defaultHTML!, defaultHTML!],
    },
  ];

  return (
    <section className='relative overflow-hidden bg-[linear-gradient(var(--color-background-secondary),#B49870)] py-20 sm:py-24 lg:py-32 xl:py-40'>
      <div className='absolute left-0 top-0 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2'>

      </div>

      {/* Stars */}
      <div className='absolute left-0 top-0 z-0 h-72 w-72' aria-hidden='true'>
        <StarField density='high' maxRadius={2.5} minRadius={1.25} />
      </div>
      <CodeShowcase features={features} />
    </section>
  );
}
