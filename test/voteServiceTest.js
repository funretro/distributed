describe('VoteService: ', () => {
  let FirebaseService;
  let VoteService;

  beforeEach(angular.mock.module('fireideaz'));
  beforeEach(inject((_VoteService_, _FirebaseService_) => {
    VoteService = _VoteService_;
    FirebaseService = _FirebaseService_;
    sinon.stub(localStorage, 'getItem');
  }));

  describe('returnNumberOfVotes', () => {
    it('should return number of votes', () => {
      localStorage.getItem.returns('{"abc":1, "abd":3, "sef":2}');
      expect(
        VoteService.returnNumberOfVotes('userId', ['abc', 'abd', 'sef'])
      ).to.equal(6);
      localStorage.getItem.restore();
    });

    it('should return number of votes of 3', () => {
      localStorage.getItem.returns('{"abc":3}');
      expect(VoteService.returnNumberOfVotes('userId', ['abc'])).to.equal(3);
      localStorage.getItem.restore();
    });

    it('should return number of votes of 5 when message was deleted', () => {
      localStorage.getItem.returns('{"abc":3, "avc": 2, "afe": 2}');
      expect(
        VoteService.returnNumberOfVotes('userId', ['abc', 'avc'])
      ).to.equal(5);
      localStorage.getItem.restore();
    });

    it('should return zero if there is no board', () => {
      localStorage.getItem.returns(null);
      expect(VoteService.returnNumberOfVotes('userId')).to.equal(0);
      localStorage.getItem.restore();
    });
  });

  describe('returnNumberOfVotesOnMessage', () => {
    it('should return array containing 1 element for each vote on a message', () => {
      sinon.stub(VoteService, 'returnNumberOfVotesOnMessage').returns(3);

      const array = VoteService.getNumberOfVotesOnMessage('userId', 'abc');

      expect(array.length).to.equal(3);
    });

    it('should return empty array', () => {
      sinon.stub(VoteService, 'returnNumberOfVotesOnMessage').returns(0);

      const array = VoteService.getNumberOfVotesOnMessage('userId', 'abc');

      expect(array.length).to.equal(0);
    });

    it('should return number of votes', () => {
      localStorage.getItem.returns('{"abc":1, "abd":3, "sef":2}');
      expect(
        VoteService.returnNumberOfVotesOnMessage('userId', 'abc')
      ).to.equal(1);
      localStorage.getItem.restore();
    });

    it('should return number of votes of 3', () => {
      localStorage.getItem.returns('{"abc":3}');
      expect(
        VoteService.returnNumberOfVotesOnMessage('userId', 'abc')
      ).to.equal(3);
      localStorage.getItem.restore();
    });

    it('should return zero if there is no board', () => {
      localStorage.getItem.returns(null);
      expect(
        VoteService.returnNumberOfVotesOnMessage('userId', 'abc')
      ).to.equal(0);
      localStorage.getItem.restore();
    });
  });

  describe('remainingVotes', () => {
    it('should return remaining votes 3', () => {
      sinon.stub(VoteService, 'returnNumberOfVotes').returns(2);
      expect(VoteService.remainingVotes('userId', 5, [])).to.equal(3);
      VoteService.returnNumberOfVotes.restore();
    });

    it('should return remaining votes 0', () => {
      sinon.stub(VoteService, 'returnNumberOfVotes').returns(5);
      expect(VoteService.remainingVotes('userId', 5)).to.equal(0);
      VoteService.returnNumberOfVotes.restore();
    });
  });

  describe('increase messages', () => {
    it('should set user message votes to 1', () => {
      localStorage.getItem.returns(null);
      sinon.spy(localStorage, 'setItem');

      VoteService.increaseMessageVotes('userId', 'abc');

      expect(localStorage.setItem.calledWith('userId', '{"abc":1}')).to.be.true;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });

    it('should increase user message votes to 2', () => {
      localStorage.getItem.returns('{"abc":1}');
      sinon.spy(localStorage, 'setItem');

      VoteService.increaseMessageVotes('userId', 'abc');

      expect(localStorage.setItem.calledWith('userId', '{"abc":2}')).to.be.true;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });

    it('should increase user message votes to 5', () => {
      localStorage.getItem.returns('{"abc":4,"abd":3}');
      sinon.spy(localStorage, 'setItem');

      VoteService.increaseMessageVotes('userId', 'abc');

      expect(localStorage.setItem.calledWith('userId', '{"abc":5,"abd":3}')).to
        .be.true;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });
  });

  describe('decrease messages', () => {
    it('should remove from localStorage if votes equal to 1', () => {
      localStorage.getItem.returns('{"abc":1}');
      sinon.spy(localStorage, 'setItem');

      VoteService.decreaseMessageVotes('userId', 'abc');

      expect(localStorage.setItem.calledWith('userId', '{}')).to.be.true;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });

    it('should remove from localStorage if votes equal to -1', () => {
      localStorage.getItem.returns('{"abc":-1}');
      sinon.spy(localStorage, 'setItem');

      VoteService.decreaseMessageVotes('userId', 'abc');

      expect(localStorage.setItem.calledWith('userId', '{}')).to.be.true;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });

    it('should decrease votes', () => {
      localStorage.getItem.returns('{"abc":3}');
      sinon.spy(localStorage, 'setItem');

      VoteService.decreaseMessageVotes('userId', 'abc');

      expect(localStorage.setItem.calledWith('userId', '{"abc":2}')).to.be.true;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });

    it('should decrease user message votes to 4', () => {
      localStorage.getItem.returns('{"abc":5,"abd":3}');
      sinon.spy(localStorage, 'setItem');

      VoteService.decreaseMessageVotes('userId', 'abc');

      expect(localStorage.setItem.calledWith('userId', '{"abc":4,"abd":3}')).to
        .be.true;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });
  });

  describe('merge messages', () => {
    it('should merge messages votes', () => {
      localStorage.getItem.returns('{"abc":5,"abf":3,"abd":2}');
      sinon.spy(localStorage, 'setItem');

      VoteService.mergeMessages('userId', 'abc', 'abf');

      expect(localStorage.setItem.calledWith('userId', '{"abf":8,"abd":2}')).to
        .be.true;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });

    it('should not merge messages votes if drag is zero', () => {
      localStorage.getItem.returns('{"abf":3,"abd":2}');
      sinon.spy(localStorage, 'setItem');

      VoteService.mergeMessages('userId', 'abc', 'abf');

      expect(localStorage.setItem.called).to.be.false;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });

    it('should merge messages votes if drop is zero', () => {
      localStorage.getItem.returns('{"abc":3,"abd":2}');
      sinon.stub(localStorage, 'getItem', () => '');
      sinon.spy(localStorage, 'setItem');

      VoteService.mergeMessages('userId', 'abc', 'abf');

      expect(localStorage.setItem.calledWith('userId', '{"abd":2,"abf":3}')).to
        .be.true;

      localStorage.getItem.restore();
      localStorage.setItem.restore();
    });
  });

  describe('control votes', () => {
    it('should be able to unvote if votes equal to 3', () => {
      sinon.stub(localStorage, 'getItem', () => '{"abc":2,"afe":1}');
      expect(VoteService.canUnvoteMessage('userId', 'abc')).to.be.true;
      localStorage.getItem.restore();
    });

    it('should not be able to unvote if votes equal to 0', () => {
      sinon.stub(localStorage, 'getItem', () => null);
      expect(VoteService.canUnvoteMessage('userId', 'abc')).to.be.false;
      localStorage.getItem.restore();
    });

    it('should return true if still has votes', () => {
      sinon.stub(localStorage, 'getItem', () => '{"abc":2,"abd":2}');
      expect(VoteService.isAbleToVote('abc', 5)).to.be.true;
      localStorage.getItem.restore();
    });

    it('should return false if does not have votes', () => {
      sinon.stub(VoteService, 'remainingVotes', () => 0);
      expect(VoteService.isAbleToVote('abc', 5)).to.be.false;
      VoteService.remainingVotes.restore();
    });
  });

  describe('extract message ids', () => {
    it('should extract messages ids', () => {
      const original = [{ $id: '123' }, { $id: '124' }, { $id: '125' }];

      expect(VoteService.extractMessageIds(original).length).to.equal(3);
      expect(VoteService.extractMessageIds(original)[0]).to.equal('123');
      expect(VoteService.extractMessageIds(original)[1]).to.equal('124');
      expect(VoteService.extractMessageIds(original)[2]).to.equal('125');
    });
  });

  describe('vote limits', () => {
    it('is able to increment the maximum number of votes allowed per user', () => {
      const updateSpy = sinon.spy();
      sinon.stub(FirebaseService, 'getBoardRef', () => ({
        update: updateSpy,
      }));

      VoteService.incrementMaxVotes(123, 1);
      expect(updateSpy.calledWith({ max_votes: 2 })).to.be.true;
    });

    it('is not able to increment the maximum number of votes allowed per user if bigger than 99', () => {
      const updateSpy = sinon.spy();
      sinon.stub(FirebaseService, 'getBoardRef', () => ({
        update: updateSpy,
      }));

      VoteService.incrementMaxVotes(123, 99);
      expect(updateSpy.called).to.be.false;
    });

    it('is able to decrement the maximum number of votes allowed per user', () => {
      const updateSpy = sinon.spy();
      sinon.stub(FirebaseService, 'getBoardRef', () => ({
        update: updateSpy,
      }));

      VoteService.decrementMaxVotes(123, 3);
      expect(updateSpy.calledWith({ max_votes: 2 })).to.be.true;
    });
  });

  it('should vote on a message', () => {
    sinon.stub(FirebaseService, 'getServerTimestamp', () => '00:00:00');
    sinon.stub(VoteService, 'isAbleToVote', () => true);
    const updateSpy = sinon.spy();
    sinon.stub(FirebaseService, 'getMessagesRef', () => ({
      child() {
        return {
          update: updateSpy,
        };
      },
    }));

    sinon.spy(VoteService, 'increaseMessageVotes');

    VoteService.vote('userId', 10, {}, 'abc', 5);

    expect(updateSpy.calledWith({ votes: 6, date: '00:00:00' })).to.be.true;
    expect(VoteService.increaseMessageVotes.calledWith('userId', 'abc')).to.be
      .true;
  });

  it('should unvote a message', () => {
    sinon.stub(FirebaseService, 'getServerTimestamp', () => '00:00:00');
    sinon.stub(VoteService, 'canUnvoteMessage', () => true);
    sinon.spy(VoteService, 'decreaseMessageVotes');
    const updateSpy = sinon.spy();
    sinon.stub(FirebaseService, 'getMessagesRef', () => ({
      child() {
        return {
          update: updateSpy,
        };
      },
    }));

    VoteService.unvote('userId', 'abc', 5);

    expect(updateSpy.calledWith({ votes: 4, date: '00:00:00' })).to.be.true;
    expect(VoteService.decreaseMessageVotes.calledWith('userId', 'abc')).to.be
      .true;
  });

  it('should not give negative votes to a message with votes -1', () => {
    sinon.stub(FirebaseService, 'getServerTimestamp', () => '00:00:00');
    sinon.stub(VoteService, 'canUnvoteMessage', () => true);
    sinon.spy(VoteService, 'decreaseMessageVotes');
    const updateSpy = sinon.spy();
    sinon.stub(FirebaseService, 'getMessagesRef', () => ({
      child() {
        return {
          update: updateSpy,
        };
      },
    }));

    VoteService.unvote('userId', 'abc', -1);

    expect(updateSpy.calledWith({ votes: 0, date: '00:00:00' })).to.be.true;
    expect(VoteService.decreaseMessageVotes.calledWith('userId', 'abc')).to.be
      .true;
  });

  it('should not give negative votes to a message with zero votes', () => {
    sinon.stub(FirebaseService, 'getServerTimestamp', () => '00:00:00');
    sinon.stub(VoteService, 'canUnvoteMessage', () => true);
    sinon.spy(VoteService, 'decreaseMessageVotes');
    const updateSpy = sinon.spy();
    sinon.stub(FirebaseService, 'getMessagesRef', () => ({
      child() {
        return {
          update: updateSpy,
        };
      },
    }));

    VoteService.unvote('userId', 'abc', 0);

    expect(updateSpy.calledWith({ votes: 0, date: '00:00:00' })).to.be.true;
    expect(VoteService.decreaseMessageVotes.calledWith('userId', 'abc')).to.be
      .true;
  });
});
