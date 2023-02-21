<?php

use Symfony\Component\Yaml\Yaml;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require "vendor/autoload.php";

$config = Yaml::parse(file_get_contents(__DIR__ . '/config.yml'));
$config['assets'] = trim($config['assets'] ?? 'assets', '/');
$config['target'] = trim($config['target'] ?? 'public', '/');
$config['languages'] = $config['languages'] ?? 'en';
$config['files'] = $config['files'] ?? [];


$target = trim($config['target'], '/');
$languages = $config['languages'];
$pages = $config['pages'];

exec("rm -Rf " . __DIR__ . "/$target");
mkdir(__DIR__ . "/$target");

foreach ($languages as $language) {
    $languageTranslations = Yaml::parse(file_get_contents(__DIR__ . "/languages/$language.yml"));
    if ($language !== $config['root_language']) {
        mkdir(__DIR__ . "/$target/$language");
    }

    $urls = $languageTranslations['urls'] ?? [];
    $twig = new Environment(new FilesystemLoader([
        __DIR__ . '/templates'
    ]));

    $twig->addFunction(new \Twig\TwigFunction('url', function($url) use ($urls) {
        return $urls[$url][1] . '.html';
    }));

    $twig->addFunction(new \Twig\TwigFunction('urlname', function($url) use ($urls) {
        return $urls[$url][0];
    }));

    $twig->addFunction(new \Twig\TwigFunction('email', function($email) use ($urls) {
        return '<span class="email">' . strrev($email) . '</span>';
    }));

    $numberOfPages = 0;
    foreach ($pages as $page) {
        $numberOfPages++;
        generatePageInLanguage(
            $twig,
            $page,
            $language,
            array_merge(
                $languageTranslations[$page] ?? [],
                $languageTranslations['global'] ?? []
            ),
            $config,
            $languageTranslations['urls'] ?? []
        );
    }

    echo "Generated $numberOfPages pages for language $language" . PHP_EOL;
}

copyResources($config);

function compileTranslations(
    Environment $twig,
    &$translations
)
{
    foreach ($translations as &$translation) {
        if (is_array($translation)) {
            compileTranslations($twig, $translation);
        } else {
            $translation = $twig->render($twig->createTemplate($translation));
        }
    }
}

/**
 * @param Environment $twig
 * @param string      $page
 * @param string      $language
 * @param array       $translations
 * @param array       $config
 * @param array       $urls
 */
function generatePageInLanguage(
    Environment $twig,
    string $page,
    string $language,
    array $translations,
    array $config,
    array $urls
)
{
    $target = $config['target'];
    $assets = $config['assets'];
    $isRootLanguage = $language === $config['root_language'];
    $rootPath = $isRootLanguage ? '.' : '..';
    $languagePath = $isRootLanguage
        ? ''
        : "/$language";

    compileTranslations($twig, $translations);

    $content = $twig->render("$page.twig", [
        'config' => $config,
        't' => $translations,
        'root_path' => $rootPath,
        'assets_path' => $rootPath . '/' . $assets,
        'language' => $language,
    ]);

    $url = isset($urls[$page]) ? $urls[$page][1] : $page;

    file_put_contents(__DIR__ . "/{$target}{$languagePath}/$url.html", $content);
}

/**
 * @param array $config
 */
function copyResources(array $config)
{
    $target = $config['target'];
    $assets = $config['assets'];
    $sourcePath = __DIR__ . "/$assets";
    $targetPath = __DIR__ . "/$target/$assets";
    exec("cp -R $sourcePath $targetPath");

    foreach ($config['files'] as $file) {
        $sourcePath = __DIR__ . "/$file";
        $targetPath = __DIR__ . "/$target/$file";
        exec("cp $sourcePath $targetPath");
    }
}
