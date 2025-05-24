import { getAuthor, formatDate, type BlogPost } from '../../lib/metadata';
import Card from '../global/Card';

interface BlogAuthorProps {
  post: BlogPost;
  showBio?: boolean;
}

export default function BlogAuthor({ post, showBio = false }: BlogAuthorProps) {
  const author = getAuthor(post.author);
  
  if (!author) {
    return (
      <div className="text-gray-500 text-sm">
        By {post.author} • {formatDate(post.publishDate)}
      </div>
    );
  }
  
  return (
    <Card variant="bordered" padding="sm" className="not-prose">
      <div className="flex items-start space-x-3">
        {author.avatar ? (
          <img 
            src={author.avatar} 
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {author.name.charAt(0)}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold text-gray-900">{author.name}</h4>
            <span className="text-gray-300">•</span>
            <time className="text-sm text-gray-500">
              {formatDate(post.publishDate)}
            </time>
          </div>
          
          {showBio && (
            <p className="mt-1 text-sm text-gray-600">{author.bio}</p>
          )}
          
          {Object.keys(author.social).length > 0 && (
            <div className="mt-2 flex space-x-2">
              {author.social.website && (
                <a 
                  href={author.social.website}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              )}
              {author.social.github && (
                <a 
                  href={author.social.github}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}
              {author.social.twitter && (
                <a 
                  href={author.social.twitter}
                  className="text-blue-400 hover:text-blue-600 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}