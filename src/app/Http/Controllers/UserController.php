<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;


class UserController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws Exception
     */
    public function login(Request $request)
    {
        $auth_data = $this->checkAuth($request->json()->all());

        $username = $auth_data['username'];
        $user = User::where('name', $username)->first();

        if (!$user) {
            $user = new User();
            $user->name = $username;
            $user->email = Carbon::now()->getTimestamp() . '@dispostable.com';
            $user->email_verified_at = Carbon::now();
            $user->password = md5(bin2hex(random_bytes(40)));
            $user->setRememberToken(md5(bin2hex(random_bytes(40))));
            $user->save();
        }

        return response()->json(array_merge($user->toArray(), [
            'token' => $user->getRememberToken()
        ]));
    }


    public function devLogin(Request $request)
    {
        if (!App::environment('local')) {
            throw new \Exception("Only available on local environments");
        }

        $username = $request->post('username');
        $user = User::where('name', $username)->first();

        if (!$user) {
            $user = new User();
            $user->name = $username;
            $user->email = Carbon::now()->getTimestamp() . '@dispostable.com';
            $user->email_verified_at = Carbon::now();
            $user->password = md5(bin2hex(random_bytes(40)));
            $user->setRememberToken(md5(bin2hex(random_bytes(40))));
            $user->save();
        }

        return response()->json(array_merge($user->toArray(), [
            'token' => $user->getRememberToken(),
            'role' => 'user',
        ]));
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    /**
     * @throws Exception
     */
    private function checkAuth(array $authData): array
    {
        $signature = $authData["hash"];

        unset($authData["hash"]);
        $data_check_arr = [];
        foreach ($authData as $key => $value) {
            $data_check_arr[] = $key . '=' . $value;
        }
        sort($data_check_arr);
        $data_check_string = implode("\n", $data_check_arr);

        $expectedSignature = hash_hmac(
            'sha256',
            $data_check_string,
            hash('sha256', getenv("TELEGRAM_BOT_TOKEN"), true)
        );

        if (strcmp($expectedSignature, $signature) !== 0) {
            throw new Exception('Data is NOT from Telegram');
        }

        if ((time() - $authData['auth_date']) > 86400) {
            throw new Exception('Data is outdated');
        }

        return $authData;
    }
}
