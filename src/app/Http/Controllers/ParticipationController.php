<?php

namespace App\Http\Controllers;

use App\Models\Affair;
use App\Models\Participation;
use App\Models\User;
use Illuminate\Http\Request;

class ParticipationController extends Controller
{
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $participation = new Participation();

        $affair = Affair::findOrFail($request->post('affair'));
        $user = User::findOrFail($request->post('user'));

        $participation->affair()->associate($affair);
        $participation->user()->associate($user);

        $participation->save();

        return response()->json($participation);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /** @var Participation $participation */
        $participation = Participation::findOrFail($id);
        $participation->delete();

        // todo verify user is the participant, affair host or admin

        return response('ok');
    }
}
