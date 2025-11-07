#include "napi.h"

typedef Napi::ThreadSafeFunction TSFN_t;

static void callback(Napi::Env env, Napi::Function jsCallback, uint32_t* status) {
    if (env != nullptr) {
        jsCallback.Call({ Napi::Number::New(env, *status) });
    }
    delete status;
}