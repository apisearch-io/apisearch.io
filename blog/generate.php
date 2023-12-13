<?php

namespace App;

use League\CommonMark\CommonMarkConverter;
use Symfony\Component\Yaml\Yaml;
use Twig\Environment;
use Twig\Extra\Intl\IntlExtension;
use Twig\Loader\FilesystemLoader;
use Symfony\Component\Finder\Finder;

require "../vendor/autoload.php";

$converter = new CommonMarkConverter();
$twig = new Environment(new FilesystemLoader([
    __DIR__ . '/templates'
]));
$twig->addExtension(new IntlExtension());

echo 'Generating blog...' . PHP_EOL . PHP_EOL;

mkdir(__DIR__ . '/../docs/blog');
$files = Finder::create()
    ->in(__DIR__ . '/_posts')
    ->files()
    ->sort(function(\SplFileInfo $file1, \SplFileInfo $file2) {
        return $file1->getFilename() < $file2->getFilename();
    });

$posts = [];
$urls = [];
foreach ($files as $file) {
    $content = $file->getContents();
    $parts = explode('---', $content);
    $yaml = Yaml::parse(trim($parts[1]));
    if (($yaml['published'] ?? true) === false) {
        continue;
    }


    $fileName = explode('.', $file->getFilename(), 2)[0];
    $slug = substr($fileName, 11);
    $url = 'https://apisearch.io/blog/' . $slug;
    $urls[] = $url;
    $yaml['url'] = $slug .'.html';
    $body = $converter->convert($parts[2]);
    $post = array_merge(
        $yaml,
        [
            'content' => $body
        ]
    );

    $html = $twig->render('post.twig', [
        'post' => $post
    ]);

    $html = str_replace('src="assets/', 'src="../assets/blog/', $html);
    file_put_contents(__DIR__ . "/../docs/blog/$slug.html", $html);

    $posts[] = $post;
    echo '> ' . $yaml['title'] . PHP_EOL;
}

file_put_contents(__DIR__ . '/../docs/blog/index.html', $twig->render('home.twig', [
    'posts' => $posts,
    'title' => 'Blog dedicado al mundo del ecommerce y los buscadores para tiendas online.',
    'description' => 'Blog dedicado al mundo del ecommerce y los buscadores para tiendas online, así como a novedades en inteligencia artificial',
    'keywords' => 'Apisearch, ecommerce, tiendas online, inteligencia artificial'
]));


generateSitemap($urls);
copyResources();


function generateSitemap(array $urls)
{
    $lastMod = (new \DateTime())->format('Y-m-d');
    $content = '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    foreach ($urls as $url) {
        $content .= "
<url>
    <loc>$url</loc>
    <lastmod>$lastMod</lastmod>
</url>";
    }
    $content .= '
</urlset>';

    file_put_contents(__DIR__ . "/../docs/sitemap_blog.xml", $content);
}

function copyResources()
{
    $sourcePath = __DIR__ . '/assets';
    $targetPath = __DIR__ . '/../docs/assets/blog';
    exec("cp -R $sourcePath $targetPath");
}
