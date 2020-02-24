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
            "conditions": [
                [
                    "OS != 'win'",
                    {
                        "libraries": [
                            "-Wl,-rpath,<(module_root_dir),-rpath,./ -L<(module_root_dir) -lLexFloatClient"
                        ]
                    }
                ],
                [
                    "OS == 'win'",
                    {
                        "libraries": [
                            "<(module_root_dir)/LexFloatClient.lib"
                        ],
                        "copies": [
                            {
                                "destination": "<(module_root_dir)/build/Release/",
                                "files": [
                                    "<(module_root_dir)/LexFloatClient.dll"
                                ]
                            }
                        ]
                    }
                ]
            ],
            "defines": [
                "NAPI_DISABLE_CPP_EXCEPTIONS"
            ],
            "xcode_settings": {
                "CLANG_CXX_LIBRARY": "libc++",
                "MACOSX_DEPLOYMENT_TARGET": "10.7"
            }
        }
    ]
}