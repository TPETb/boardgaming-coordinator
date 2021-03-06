<?php

namespace App\Http\Controllers;

use App\Models\Affair;
use App\Models\Game;
use App\Models\Participation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AffairController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $affairs = Affair::query()
            ->with(['host', 'game', 'participants'])
            ->whereBetween('starts_at', [
                Carbon::parse($request->get('min_starts_at')),
                Carbon::parse($request->get('max_starts_at')),
            ])
        ;

        return response()->json($affairs->get()->map(function (Affair $affair) {
            return array_merge($affair->toArray(), [
                'ends_at' => Carbon::parse($affair->starts_at)->addHour()->toISOString(),
            ]);
        }));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $currentUser = $this->getCurrentUser();

        if (!$currentUser) {
            throw new \Exception("Guests cannot create Affairs", 403);
        }

        if (Carbon::createFromTimestamp($request->post('start'))->isPast()) {
            throw new \Exception("Cannot create Affair in past", 400);
        }

        $game = Game::where('name', $request->post('gameName'))->firstOrFail();

        $affair = new Affair();
        $affair->host()->associate($currentUser);
        $affair->game()->associate($game);
        $affair->starts_at = Carbon::createFromTimestamp($request->post('start'));
        $affair->slots = $request->post('slots');
        $affair->comment = $request->post('comment');
        $affair->save();

        // Immediately add as a participant
        $participation = new Participation();
        $participation->affair()->associate($affair);
        $participation->user()->associate($currentUser);
        $participation->save();

        return response()->json(array_merge($affair->toArray(), [
            'ends_at' => Carbon::parse($affair->starts_at)->addHour()->toISOString(),
            'participants' => [],
        ]));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Affair $affair
     * @return \Illuminate\Http\Response
     */
    public function show(Affair $affair)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Affair $affair
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Affair $affair)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Affair $affair
     * @return \Illuminate\Http\Response
     */
    public function destroy(Affair $affair)
    {
        //
    }
}
