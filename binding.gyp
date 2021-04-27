{
    "targets": [
        {
            "target_name": "lexfloatclient",
            "sources": [
                "src/main.cpp"
            ],
            "cflags!": [
                "-fno-exceptions"
            ],
            "cflags_cc!": [
                "-fno-exceptions"
            ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            'variables': {
                'libcurl_dependency%' : "<!(node -p \"require('detect-libc').isNonGlibcLinux ? '-lcurl' : ''\")",
            },
            "conditions": [
                [
                    "OS == 'linux'",
                    {
                        "libraries": [
                            "-Wl,-Bstatic  -L<(module_root_dir) -lLexFloatClient -Wl,-Bdynamic -lpthread <(libcurl_dependency)"
                        ]
                    }
                ],
                [
                    "OS == 'mac'",
                    {
                        "libraries": [
                            "-Wl -L<(module_root_dir) -lLexFloatClient -framework CoreFoundation -framework SystemConfiguration -framework Security"
                        ]
                    }
                ],
                [
                    "OS == 'win'",
                    {
                        "libraries": [
                            "<(module_root_dir)/LexFloatClient.lib"
                        ]
                    }
                ]
            ],
            "defines": [
                "NAPI_DISABLE_CPP_EXCEPTIONS"
            ],
            "xcode_settings": {
                "CLANG_CXX_LIBRARY": "libc++",
                "MACOSX_DEPLOYMENT_TARGET": "10.9"
            }
        }
    ]
}
