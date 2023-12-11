<?php

use Symfony\Component\Yaml\Yaml;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require "../vendor/autoload.php";

$files = \Symfony\Component\Finder\Finder::create()
    ->in(__DIR__ . '/_posts')
    ->files();

$urls = [];
foreach ($files as $file) {
    $fileName = explode('.', $file->getFilename(), 2)[0];
    $urls[] = 'https://apisearch.io/blog/' . substr($fileName, 11);
}

generateSitemap($urls);

function generateSitemap(array $urls)
{
    $lastMod = (new DateTime())->format('Y-m-d');
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
