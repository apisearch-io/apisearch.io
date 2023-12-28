<?php

use Symfony\Component\Yaml\Yaml;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require "vendor/autoload.php";

$config = Yaml::parse(file_get_contents(__DIR__ . '/config.yml'));
$config['assets'] = trim($config['assets'] ?? 'assets', '/');
$config['target'] = trim($config['target'] ?? 'public', '/');
$config['languages'] = $config['languages'] ?? 'en';
$config['telf'] = "644 30 14 02";

$target = trim($config['target'], '/');
$languages = $config['languages'];
$pages = $config['pages'];

exec("rm -Rf " . __DIR__ . "/$target");
mkdir(__DIR__ . "/$target");
echo 'Generating website...' . PHP_EOL . PHP_EOL;

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
        return $urls[$url][1];
    }));

    $twig->addFunction(new \Twig\TwigFunction('urlname', function($url) use ($urls) {
        return $urls[$url][0];
    }));

    $twig->addFunction(new \Twig\TwigFunction('email', function($email) use ($urls) {
        return '<span class="email">' . strrev($email) . '</span>';
    }));

    $numberOfPages = 0;
    $urls = [];
    foreach ($pages as $page) {
        $numberOfPages++;
        $urls[] = generatePageInLanguage(
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

    generateSitemap($config, $urls);
    generateCNAME();
    generateBusinessPlan($twig);

    echo "Generated $numberOfPages pages for language $language" . PHP_EOL . PHP_EOL;
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
    $rootPath = 'file:///var/www/apisearch/apisearch.io/docs';
    // $rootPath = 'https://apisearch.io';
    $languagePath = $isRootLanguage
        ? ''
        : "/$language";

    compileTranslations($twig, $translations);

    $url = isset($urls[$page]) ? $urls[$page][1] : $page;
    $canonical = $rootPath . $languagePath . ($url === 'index'
        ? ''
        : "/$url");
    echo '> ' . $canonical . PHP_EOL;
    $content = $twig->render("$page.twig", [
        'config' => $config,
        't' => $translations,
        'meta' => $urls[$page][2] ?? $translations['meta'],
        'root_path' => $rootPath,
        'assets_path' => $rootPath . '/' . $assets,
        'language' => $language,
        'absolute_path' => str_replace(['/index.html', '/docs'], ['', ''], "$rootPath/{$target}{$languagePath}/$url"),
        'canonical' => $canonical,
        'hash' => (new DateTime())->format('U'),
    ]);

    file_put_contents(__DIR__ . "/{$target}{$languagePath}/$url.html", $content);

    return $canonical;
}

function generateCNAME()
{
    file_put_contents(__DIR__ . '/docs/CNAME', 'apisearch.io');
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

function generateBusinessPlan(Environment $twig)
{
    $pl = file_get_contents(__DIR__ . '/templates/bp/pnl.tsv');
    $plLines = explode("\n", $pl);
    $plCSV = array_map(fn(string $line) => explode("\t", $line), $plLines);
    $plCSV = array_map(fn(array $block) => array_slice($block, 1), $plCSV);

    $profits = $plCSV[1];
    $payrolls = $plCSV[5];
    $others = $plCSV[11];
    $infrastructure = $plCSV[12];
    $legal = $plCSV[13];
    $data = [$profits, $payrolls, $infrastructure, $legal, $others];

    foreach ($data as &$list) {
        foreach ($list as &$item) {
            $item = str_replace('(', '-', $item);
            $item = str_replace([')', '$', '€', ','], ['', '', ''], $item);
            $item = floatval($item);
        }
    }

    $balances = array_map(null, $data[0], $data[1], $data[2], $data[3], $data[4]);
    $balances = array_map('array_sum', $balances);
    $accum = [];
    $accumNumber = 0;
    foreach ($balances as $key => &$balance) {
        $balance = round($balance, 2);
        $accum[$key] = $accumNumber + $balance;
        $accumNumber = $accum[$key];
    }



    $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    $dataPerYear = [
        2022 => [
            array_slice($data[0], 0, 12),
            array_slice($data[1], 0, 12),
            array_slice($data[2], 0, 12),
            array_slice($data[3], 0, 12),
            array_slice($data[4], 0, 12),
            array_slice($balances, 0, 12),
            array_slice($accum, 0, 12),
        ],
        2023 => [
            array_slice($data[0], 12),
            array_slice($data[1], 12),
            array_slice($data[2], 12),
            array_slice($data[3], 12),
            array_slice($data[4], 12),
            array_slice($balances, 12),
            array_slice($accum, 12),
        ],
    ];

    mkdir(__DIR__ . '/docs/bp');
    foreach ([
        'index',
            'overview',
                'mission-and-vision',
                'success-cases',
                'viability-analysis',
                'business-models',
                'swot-analysis',
            'product-and-services',
                'core-offerings',
                'secondary-offerings',
                'conversational-search',
                'customer-service',
            'market-research',
                'industry-overview',
                'target-audience',
                'market-size-and-trends',
                'competitor-analysis',
            'sales-and-marketing',
                'online-presence',
                'marketing-ideas',
                'customer-retention',
            'operations',
                'operations-plan',
                'risk-analysis',
                'regulatory-compliance',
            'financials',
                'profits-and-losses',
                'costs-breakdown',
    ] as $page) {
        $content = $twig->render("bp/$page.twig", [
            'pnl' => $dataPerYear,
            'months' => $months
        ]);
        file_put_contents(__DIR__ . "/docs/bp/$page.html", $content);
    }
}

function generateSitemap(
    array $config,
    array $urls
)
{
    $target = $config['target'];
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

    file_put_contents(__DIR__ . "/{$target}/sitemap.xml", $content);
}
